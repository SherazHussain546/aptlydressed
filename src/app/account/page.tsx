"use client";

import { useAuth } from "@/context/AuthContext";
import { AuthForm } from "@/components/auth/AuthForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function AccountPage() {
  const { user, loading, signOutUser } = useAuth();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-16">
        <h1 className="text-4xl font-headline mb-8">My Account</h1>
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      {user ? (
        <div>
          <h1 className="text-4xl font-headline mb-8">Welcome, {user.email}</h1>
          <Card>
            <CardHeader>
              <CardTitle>Your Account</CardTitle>
              <CardDescription>
                View your details and manage your settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>User ID:</strong> {user.uid}
              </p>
              <Button onClick={signOutUser} variant="destructive">
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <AuthForm />
      )}
    </div>
  );
}
