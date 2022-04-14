import { initializeApp, getApps, getApp } from "firebase/app";

let app;
if (getApps().length === 0) {
  // Initialize Firebase app
  app = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  });
} else {
  // Use existing app if already initialized
  app = getApp();
}

export const firebaseApp = app;
