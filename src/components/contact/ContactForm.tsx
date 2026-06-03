"use client";

import { FormEvent, useState } from "react";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db } from "@/firebase";

type FormState = "idle" | "loading" | "success" | "error";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [fieldError, setFieldError] = useState<string | null>(null);

  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setFieldError(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldError(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setFieldError("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setFieldError("Please enter a valid email address.");
      return;
    }

    setState("loading");

    try {
      await addDoc(collection(db, "messages"), {
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
        timestamp: serverTimestamp(),
        read: false,
      });
      resetForm();
      setState("success");
    } catch {
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <p className="contact-form__status contact-form__status--success" role="status">
        ✓ Message sent! I&apos;ll get back to you soon.
      </p>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <label className="contact-form__field">
        <span className="contact-form__label">Name</span>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="contact-form__input"
          disabled={state === "loading"}
          required
          autoComplete="name"
        />
      </label>

      <label className="contact-form__field">
        <span className="contact-form__label">Email</span>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="contact-form__input"
          disabled={state === "loading"}
          required
          autoComplete="email"
        />
      </label>

      <label className="contact-form__field">
        <span className="contact-form__label">Message</span>
        <textarea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="contact-form__input contact-form__textarea"
          rows={4}
          disabled={state === "loading"}
          required
        />
      </label>

      {fieldError ? (
        <p className="contact-form__status contact-form__status--error" role="alert">
          {fieldError}
        </p>
      ) : null}

      {state === "error" ? (
        <p className="contact-form__status contact-form__status--error" role="alert">
          Something went wrong. Please email me directly.
        </p>
      ) : null}

      <button
        type="submit"
        className="contact-form__submit bp"
        data-magnetic
        disabled={state === "loading"}
      >
        {state === "loading" ? (
          <span className="contact-form__submit-inner">
            <span className="contact-form__spinner" aria-hidden="true" />
            Sending…
          </span>
        ) : (
          "Send a message →"
        )}
      </button>
    </form>
  );
}
