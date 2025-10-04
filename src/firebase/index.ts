'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  const isDev = process.env.NODE_ENV === 'development';
  if (!getApps().length) {
    const firebaseApp = initializeApp(firebaseConfig);
    const sdks = getSdks(firebaseApp);
    // In development, connect to the emulators
    if (isDev) {
      connectToEmulators(sdks.auth, sdks.firestore);
    }
    return sdks;
  }

  // If already initialized, return the SDKs
  const sdks = getSdks(getApp());
  // This check ensures that if the app is hot-reloaded, it still connects to emulators
  if (isDev && !(sdks.auth as any).emulatorConfig && !(sdks.firestore as any).emulatorConfig) {
      connectToEmulators(sdks.auth, sdks.firestore);
  }

  return sdks;
}


export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp)
  };
}


function connectToEmulators(auth: any, firestore: any) {
  // Make sure you have the emulators running.
  // For this project, the emulators are running on the following ports:
  // auth: 9099
  // firestore: 8080
  // You can check the firebase.json file for the exact ports.
  try {
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
    connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
    console.log("Connected to Firebase Emulators");
  } catch (e) {
    console.error("Error connecting to emulators. Make sure they are running.", e);
  }
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
