
"use client";

import { useEffect, useRef, useActionState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { Linkedin, Instagram, Facebook, Loader2, Handshake } from "lucide-react";
import { useFirestore } from "@/firebase";
import { collection, addDoc, where, query, getDocs } from "firebase/firestore";

import { placeholderImages } from "@/lib/data";
import { Logo } from "@/components/icons/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeToNewsletter, type NewsletterSubscribeState } from "@/app/actions/newsletter";
import { useToast } from "@/hooks/use-toast";

const heroImage = placeholderImages.find(p => p.id === 'collaborate-hero');

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full md:w-auto bg-primary hover:bg-primary/90" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : 'Notify Me'}
    </Button>
  );
}

export default function ComingSoonPage() {
  const initialState: NewsletterSubscribeState = { message: '', success: false };
  const [state, formAction] = useActionState(subscribeToNewsletter, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const firestore = useFirestore();

  useEffect(() => {
    if (state.message) {
      if (state.success && state.email) {
        // This effect runs on the client after the server action is successful
        const handleClientSideSubscription = async (email: string) => {
          try {
            const notifymeRef = collection(firestore, "notifyme");
            
            // Check if email already exists on the client
            const q = query(notifymeRef, where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
              toast({
                title: 'Heads up!',
                description: 'This email is already subscribed.',
                variant: 'destructive',
              });
              return;
            }

            // Add the new email
            await addDoc(notifymeRef, {
              email: email,
              subscribedAt: new Date(),
            });

            toast({
              title: 'Success',
              description: 'Thank you for subscribing!',
            });
            formRef.current?.reset();
          } catch (error) {
            console.error("Error subscribing on client:", error);
            toast({
              title: 'Error',
              description: 'Could not subscribe. Please try again.',
              variant: 'destructive',
            });
          }
        };

        handleClientSideSubscription(state.email);

      } else if (!state.success) {
        // Handle validation errors from the server action
        toast({
          title: 'Heads up!',
          description: state.message,
          variant: 'destructive',
        });
      }
    }
  }, [state, toast, firestore]);

  return (
    <div className="relative flex-grow flex flex-col items-center justify-center">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4 py-16">
        <div className="max-w-3xl">
            <div className="mb-8">
                <Logo />
            </div>

            <h1 className="text-4xl md:text-6xl font-headline mb-4">A New Destination for Timeless Style is Coming Soon</h1>
            <p className="max-w-2xl mx-auto mb-8 text-lg text-primary-foreground/90">
                Aptly Dressed is a new, content-driven affiliate platform connecting the most discerning brands with style-conscious consumers. We are building a curated ecosystem based on quality, sustainability, and timeless design.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-white/20">
                <h2 className="text-2xl font-headline text-white mb-4 flex items-center justify-center gap-3"><Handshake/> For Brands & Partners</h2>
                <p className="text-primary-foreground/90 mb-6">
                    We are now seeking launch partners who share our passion for quality craftsmanship and sustainable practices. If your brand aligns with our ethos of modern elegance, we invite you to get in touch.
                </p>
                <Button asChild size="lg">
                    <a href="mailto:aptlydressed@outlook.com">
                        Partner With Us
                    </a>
                </Button>
            </div>
            
            <div className="mt-12">
                <p className="text-sm text-primary-foreground/80 mb-2">Sign up for our public launch announcement:</p>
                <form ref={formRef} action={formAction} className="w-full max-w-md mx-auto flex flex-col md:flex-row gap-2">
                    <Input
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        className="bg-white/90 text-foreground flex-grow text-center md:text-left"
                        required
                    />
                    <SubmitButton />
                </form>
            </div>
        </div>
      </div>
    </div>
  );
}
