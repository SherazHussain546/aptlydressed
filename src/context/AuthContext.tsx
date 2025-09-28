"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { firebaseApp } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, pass: string) => Promise<any>;
  signIn: (email: string, pass: string) => Promise<any>;
  signOutUser: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = getAuth(firebaseApp);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const signUp = (email: string, pass: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass)
        .then(res => {
            toast({
                title: "Account Created",
                description: "You have been successfully signed up!",
            });
            return res;
        })
        .catch(err => {
            toast({
                variant: "destructive",
                title: "Sign up failed",
                description: err.message,
            });
            throw err;
        })
        .finally(() => setLoading(false));
  };

  const signIn = (email: string, pass: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass)
        .then(res => {
            toast({
                title: "Signed In",
                description: "You have been successfully signed in!",
            });
            return res;
        })
        .catch(err => {
            toast({
                variant: "destructive",
                title: "Sign in failed",
                description: err.message,
            });
            throw err;
        })
        .finally(() => setLoading(false));
  };

  const signOutUser = () => {
    return signOut(auth)
        .then(() => {
            toast({
                title: "Signed Out",
                description: "You have been successfully signed out.",
            });
        });
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
