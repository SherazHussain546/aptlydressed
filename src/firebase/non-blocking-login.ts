
'use client';
import { getFirestore, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

/**
 * Initiates an email/password sign-up and creates a user profile document.
 * This is an async operation that should be awaited.
 *
 * @param authInstance The Firebase Auth instance.
 * @param email The user's email.
 * @param password The user's password.
 * @param profileData Additional user profile data (e.g., firstName, lastName).
 */
export async function initiateEmailSignUp(
  authInstance: Auth,
  email: string,
  password: string,
  profileData: { firstName: string; lastName: string }
): Promise<void> {
  // No try/catch here; let the calling component handle errors to display them in the UI.
  const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
  const user = userCredential.user;

  // Update Firebase Auth profile
  await updateProfile(user, {
    displayName: `${profileData.firstName} ${profileData.lastName}`,
  });
  
  // Get firestore instance from the user's app
  const firestore = getFirestore(authInstance.app);

  // Create a user document in Firestore
  const userDocRef = doc(firestore, 'consumers', user.uid);
  // This operation is intentionally not awaited in the same way as auth,
  // but its errors should be handled.
  setDoc(userDocRef, {
    id: user.uid,
    firstname: profileData.firstName,
    lastname: profileData.lastName,
    email: user.email,
    createdAt: serverTimestamp(),
  }).catch(error => {
    // This could be enhanced to use a global error emitter
    console.error("Error creating user profile in Firestore:", error);
  });
}

/**
 * Initiates an email/password sign-in.
 * This is an async operation that should be awaited.
 *
 * @param authInstance The Firebase Auth instance.
 * @param email The user's email.
 * @param password The user's password.
 */
export async function initiateEmailSignIn(
  authInstance: Auth,
  email: string,
  password: string
): Promise<void> {
    // No try/catch here; let the calling component handle errors.
    await signInWithEmailAndPassword(authInstance, email, password);
}

    