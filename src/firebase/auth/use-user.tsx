'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useAuth } from '@/firebase/provider'; 

export interface UserAuthHookResult {
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
}

/**
 * Hook to get the current authenticated user from Firebase.
 * @returns An object containing the user, loading state, and error.
 */
export function useUser(): UserAuthHookResult {
  const auth = useAuth();
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [isUserLoading, setIsLoading] = useState(true);
  const [userError, setError] = useState<Error | null>(null);

  useEffect(() => {
    // If there's an initial user from the server-side, set it.
    if (auth.currentUser) {
      setUser(auth.currentUser);
      setIsLoading(false);
    }
    
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        setUser(firebaseUser);
        setIsLoading(false);
      },
      (err) => {
        setError(err);
        setIsLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  return { user, isUserLoading, userError };
}