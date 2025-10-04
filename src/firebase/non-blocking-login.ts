'use client';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import {
  Auth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { firestore } from '@/lib/firebase-admin'; // Assuming this is your admin-initialized firestore instance for server-side
import { initiateEmailSignIn, initiateEmailSignUp } from '@/firebase/non-blocking-login';
import { useAuth, useUser } from '@/firebase';

/**
 * Initiates an email/password sign-up and creates a user profile document.
 * This is a non-blocking operation.
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
  try {
    const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
    const user = userCredential.user;

    // Update Firebase Auth profile
    await updateProfile(user, {
      displayName: `${profileData.firstName} ${profileData.lastName}`,
    });

    // Create a user document in Firestore
    const userDocRef = doc(firestore, 'users', user.uid);
    await setDoc(userDocRef, {
      id: user.uid,
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: user.email,
      createdAt: serverTimestamp(),
    });

  } catch (error) {
    console.error("Error during sign-up:", error);
    // Let the UI handle displaying the error based on the Auth state listener
    throw error;
  }
}

/**
 * Initiates an email/password sign-in.
 * This is a non-blocking operation.
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
    try {
        await signInWithEmailAndPassword(authInstance, email, password);
    } catch (error) {
        console.error("Error during sign-in:", error);
        throw error;
    }
}
