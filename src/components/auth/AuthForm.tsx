
"use client";

import { useState } from "react";
import { useAuth } from "@/firebase";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { FirebaseError } from 'firebase/app';
import { initiateEmailSignIn, initiateEmailSignUp } from "@/firebase/non-blocking-login";

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        await initiateEmailSignIn(auth, email, password);
      } else {
        if (!firstName || !lastName) {
          setError("Please enter your first and last name.");
          setLoading(false);
          return;
        }
        await initiateEmailSignUp(auth, email, password, { firstName, lastName });
      }
      // On success, the useUser hook in the layout will handle the redirect/UI change.
    } catch (err: any) {
       if (err instanceof FirebaseError) {
        switch (err.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
          case 'auth/invalid-credential':
             if (isLogin) {
              // On login, this could mean wrong password OR user not found.
              // To guide the user, we switch to sign-up if we suspect the account doesn't exist.
              setIsLogin(false);
              setError("Account not found. Please create an account, or sign in if you already have one.");
            } else {
              // On sign up, this error is less likely, treat as generic.
              setError('Invalid email or password. Please try again.');
            }
            break;
          case 'auth/email-already-in-use':
            setError('This email address is already in use. Please sign in or use a different email.');
            break;
          case 'auth/weak-password':
            setError('The password is too weak. Please use at least 6 characters.');
            break;
          default:
            setError("An unexpected error occurred during authentication. Please try again.");
            console.error("Authentication error:", err.code, err.message);
            break;
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
        console.error("Non-Firebase error during authentication:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">
          {isLogin ? "Sign In" : "Create Account"}
        </CardTitle>
        <CardDescription>
          {isLogin
            ? "Access your account to see your order history."
            : "Join us to start building your wardrobe."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Authentication Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {!isLogin && (
            <div className="flex flex-col md:flex-row gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Joe"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Dane"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              disabled={loading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="animate-spin mr-2" /> : null}
            {loading
              ? "Processing..."
              : isLogin
              ? "Sign In"
              : "Sign Up"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground w-full text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <Button
            variant="link"
            className="p-1"
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
            }}
            disabled={loading}
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}

    