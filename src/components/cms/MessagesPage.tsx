"use client";

import {
  Timestamp,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "@/firebase";
import { cn } from "@/lib/utils";

type MessageRecord = {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp?: Timestamp | { seconds?: number };
  read?: boolean;
};

function formatTimestamp(value: MessageRecord["timestamp"]) {
  if (!value) return "—";
  const date =
    value instanceof Timestamp
      ? value.toDate()
      : new Date(Number(value.seconds ?? 0) * 1000);
  return date.toLocaleString();
}

function previewText(text: string, max = 72) {
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max)}…`;
}

export function useUnreadMessageCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const unread = snapshot.docs.filter((item) => !item.data().read).length;
      setCount(unread);
    });

    return () => unsubscribe();
  }, []);

  return count;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<MessageRecord[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setMessages(
          snapshot.docs.map((item) => ({
            id: item.id,
            ...(item.data() as Omit<MessageRecord, "id">),
          })),
        );
        setLoading(false);
      },
      () => setLoading(false),
    );

    return () => unsubscribe();
  }, []);

  const markAsRead = async (id: string) => {
    await updateDoc(doc(db, "messages", id), { read: true });
  };

  if (loading) {
    return (
      <p className="text-sm text-muted-foreground">Loading messages…</p>
    );
  }

  if (messages.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No messages yet.</p>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((item) => {
        const expanded = expandedId === item.id;
        const unread = !item.read;

        return (
          <article
            key={item.id}
            className={cn(
              "rounded-lg border border-border bg-card transition-colors",
              unread && "border-primary/40",
            )}
          >
            <button
              type="button"
              className="w-full px-4 py-3 text-left"
              onClick={() =>
                setExpandedId((current) =>
                  current === item.id ? null : item.id,
                )
              }
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                    !unread && "bg-transparent",
                  )}
                  style={unread ? { background: "var(--accent)" } : undefined}
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium text-foreground">{item.name}</p>
                    <time className="text-xs text-muted-foreground">
                      {formatTimestamp(item.timestamp)}
                    </time>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.email}</p>
                  <p className="mt-2 text-sm text-foreground/90">
                    {expanded ? item.message : previewText(item.message)}
                  </p>
                </div>
              </div>
            </button>

            {expanded ? (
              <div className="flex flex-wrap items-center gap-2 border-t border-border px-4 py-3">
                {unread ? (
                  <button
                    type="button"
                    className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
                    onClick={() => markAsRead(item.id)}
                  >
                    Mark as read
                  </button>
                ) : (
                  <span className="text-xs text-muted-foreground">Read</span>
                )}
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
