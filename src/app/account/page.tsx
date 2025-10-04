
"use client";

import { useUser, useAuth, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
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
import { signOut, type User } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { doc } from "firebase/firestore";
import type { UserProfile } from "@/lib/types";

function AccountDetails({ user, userProfile, isLoading }: { user: User, userProfile: UserProfile | null, isLoading: boolean }) {
  const auth = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const displayName = userProfile?.firstName || user.displayName?.split(' ')[0] || user.email;

  if (isLoading) {
    return (
      <div>
        <Skeleton className="h-10 w-3/4 mb-8" />
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/2 mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
             <Skeleton className="h-6 w-full" />
             <Skeleton className="h-6 w-full" />
             <Skeleton className="h-10 w-24" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
     <div>
        <h1 className="text-4xl font-headline mb-8">Welcome, {displayName}</h1>
        <Card>
          <CardHeader>
            <CardTitle>Your Account</CardTitle>
            <CardDescription>
              View your details and manage your settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {userProfile ? (
              <>
                <p>
                  <strong>First Name:</strong> {userProfile.firstName}
                </p>
                <p>
                  <strong>Last Name:</strong> {userProfile.lastName}
                </p>
              </>
            ) : (
              <p>Loading profile...</p>
            )}
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <Button onClick={handleSignOut} variant="destructive">
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
  )
}


export default function AccountPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user?.uid]);
  
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userDocRef);

  if (isUserLoading) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-md mx-auto">
            <h1 className="text-4xl font-headline mb-8 text-center">My Account</h1>
            <Card>
            <CardHeader>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </CardContent>
            </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      {user ? (
        <AccountDetails user={user} userProfile={userProfile} isLoading={isUserLoading || isProfileLoading} />
      ) : (
        <AuthForm />
      )}
    </div>
  );
}
