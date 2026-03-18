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
 */
export async function initiateEmailSignUp(
  authInstance: Auth,
  email: string,
  password: string,
  profileData: { firstName: string; lastName: string }
): Promise<void> {
  const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
  const user = userCredential.user;

  await updateProfile(user, {
    displayName: `${profileData.firstName} ${profileData.lastName}`,
  });
  
  const firestore = getFirestore(authInstance.app);
  const userDocRef = doc(firestore, 'consumers', user.uid);
  
  setDoc(userDocRef, {
    id: user.uid,
    firstname: profileData.firstName,
    lastname: profileData.lastName,
    email: user.email,
    createdAt: serverTimestamp(),
  }).catch(error => {
    console.error("Error creating user profile in Firestore:", error);
  });
}

/**
 * Initiates an email/password sign-in.
 */
export async function initiateEmailSignIn(
  authInstance: Auth,
  email: string,
  password: string
): Promise<void> {
    await signInWithEmailAndPassword(authInstance, email, password);
}
