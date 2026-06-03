"use client";

import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

function readEnv(name) {
  return process.env[name];
}

export function getFirebaseConfig() {
  return {
    apiKey:
      readEnv("NEXT_PUBLIC_FIREBASE_API_KEY") ??
      readEnv("REACT_APP_FIREBASE_API_KEY"),
    authDomain:
      readEnv("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN") ??
      readEnv("REACT_APP_FIREBASE_AUTH_DOMAIN"),
    projectId:
      readEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID") ??
      readEnv("REACT_APP_FIREBASE_PROJECT_ID"),
    storageBucket:
      readEnv("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET") ??
      readEnv("REACT_APP_FIREBASE_STORAGE_BUCKET"),
    messagingSenderId:
      readEnv("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID") ??
      readEnv("REACT_APP_FIREBASE_MESSAGING_SENDER_ID"),
    appId:
      readEnv("NEXT_PUBLIC_FIREBASE_APP_ID") ??
      readEnv("REACT_APP_FIREBASE_APP_ID"),
    measurementId:
      readEnv("NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID") ??
      readEnv("REACT_APP_FIREBASE_MEASUREMENT_ID"),
  };
}

export function isFirebaseConfigured() {
  const config = getFirebaseConfig();
  return Boolean(config.apiKey && config.projectId && config.appId);
}

let firebaseApp = null;
let firebaseAuth = null;
let firebaseDb = null;

function ensureFirebase() {
  if (typeof window === "undefined") {
    return false;
  }

  if (!isFirebaseConfigured()) {
    return false;
  }

  if (!firebaseApp) {
    const config = getFirebaseConfig();
    firebaseApp = getApps().length ? getApps()[0] : initializeApp(config);
    firebaseAuth = getAuth(firebaseApp);
    firebaseDb = getFirestore(firebaseApp);
  }

  return true;
}

/** @returns {import("firebase/auth").Auth | null} */
export function getClientAuth() {
  return ensureFirebase() ? firebaseAuth : null;
}

/** @returns {import("firebase/firestore").Firestore | null} */
export function getClientDb() {
  return ensureFirebase() ? firebaseDb : null;
}
