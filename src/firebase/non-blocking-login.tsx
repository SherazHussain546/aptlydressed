
'use client';
import {
  Auth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { errorEmitter } from './error-emitter';
import { FirestorePermissionError } from './errors';

interface UserProfileData {
  firstName: string;
  lastName: string;
}

/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  signInAnonymously(authInstance);
}

/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(
  authInstance: Auth,
  email: string,
  password: string,
  profileData: UserProfileData
): void {
  createUserWithEmailAndPassword(authInstance, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // Set the user's display name
      return updateProfile(user, {
        displayName: `${profileData.firstName} ${profileData.lastName}`,
      }).then(() => {
        // Now, create the user profile document in Firestore
        const firestore = getFirestore(authInstance.app);
        const userDocRef = doc(firestore, 'users', user.uid);
        const userProfile = {
          id: user.uid,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          email: user.email,
        };

        // Use a non-blocking write to Firestore
        setDoc(userDocRef, userProfile).catch((serverError) => {
          const permissionError = new FirestorePermissionError({
            path: userDocRef.path,
            operation: 'create',
            requestResourceData: userProfile,
          });
          errorEmitter.emit('permission-error', permissionError);
        });
      });
    })
    .catch((error) => {
      // The onAuthStateChanged listener will handle the auth error UI,
      // but you might want to log this specific creation error.
      console.error('Error during sign-up:', error);
    });
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  signInWithEmailAndPassword(authInstance, email, password);
}
