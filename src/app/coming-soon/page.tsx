
"use client";

import { useEffect, useRef, useActionState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { Linkedin, Instagram, Facebook, Loader2, Handshake } from "lucide-react";

import { placeholderImages } from "@/lib/data";
import { Logo } from "@/components/icons/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeToNewsletter } from "@/app/actions/newsletter";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const heroImage = placeholderImages.find(p => p.id === 'hero-1');

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full md:w-auto bg-primary hover:bg-primary/90" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : 'Notify Me'}
    </Button>
  );
}

export default function ComingSoonPage() {
  const [state, formAction] = useActionState(subscribeToNewsletter, { message: '' });
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.message) {
      toast({
        title: state.message.includes('Thank you') ? 'Success' : 'Heads up!',
        description: state.message,
        variant: state.message.includes('Thank you') ? 'default' : 'destructive',
      });
      if (state.message.includes('Thank you')) {
        formRef.current?.reset();
      }
    }
  }, [state, toast]);

  return (
    <div className="relative min-h-screen w-full">
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
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative h-full min-h-screen flex flex-col items-center justify-center text-center text-white px-4 py-16">
        <div className="max-w-2xl bg-black/20 backdrop-blur-sm p-8 rounded-xl">
            <div className="mb-8">
                <Logo />
            </div>

            <h1 className="text-4xl md:text-6xl font-headline mb-4">Timeless Style is Coming Soon</h1>
            <p className="max-w-xl mx-auto mb-8 text-lg text-primary-foreground/90">
                Welcome to Aptly Dressed, your new destination for curated collections of high-quality, sustainable fashion. We're putting the final touches on a modern shopping experience designed to elevate your style. Be the first to know when we launch.
            </p>

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
            
            <div className="mt-12">
                <p className="text-sm text-primary-foreground/80 mb-4">Follow our journey</p>
                <div className="flex justify-center space-x-6">
                    <Link href="https://www.linkedin.com/company/aptlydressed" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <Linkedin className="h-6 w-6 text-primary-foreground/80 transition-colors hover:text-white" />
                    </Link>
                    <Link href="https://www.instagram.com/aptlydressed/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <Instagram className="h-6 w-6 text-primary-foreground/80 transition-colors hover:text-white" />
                    </Link>
                    <Link href="https://www.facebook.com/aptlydressed/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <Facebook className="h-6 w-6 text-primary-foreground/80 transition-colors hover:text-white" />
                    </Link>
                </div>
            </div>

            <Separator className="my-12 bg-white/20" />

            <div className="space-y-4">
                <Handshake className="h-10 w-10 mx-auto text-primary" />
                <h2 className="text-2xl font-headline">Become a Partner</h2>
                <p className="text-primary-foreground/80 max-w-md mx-auto">
                    Are you a brand that values quality, sustainability, and timeless design? We're looking for partners to join our curated collection.
                </p>
                <Button asChild variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black">
                    <Link href="/collaborate">Learn More & Get in Touch</Link>
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
