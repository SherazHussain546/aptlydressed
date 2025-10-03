
"use client";

import { useEffect, useRef, useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Linkedin, Instagram, Facebook, Loader2 } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/icons/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeToNewsletter, type NewsletterSubscribeState } from "@/app/actions/newsletter";
import { useToast } from "@/hooks/use-toast";
import { useFirestore, errorEmitter, FirestorePermissionError } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : 'Subscribe'}
    </Button>
  );
}

export function Footer() {
  const initialState: NewsletterSubscribeState = { message: '', success: false };
  const [state, formAction] = useActionState(subscribeToNewsletter, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const firestore = useFirestore();

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    if (state.message && state.success && state.email) {
      const email = state.email;
      const subscribersRef = collection(firestore, "subscribers");
      
      const data = { email: email, subscribedAt: new Date(), source: 'footer' };
      addDoc(subscribersRef, data)
        .then(() => {
          toast({
            title: 'Success',
            description: 'Thank you for subscribing!',
          });
          formRef.current?.reset();
        })
        .catch(async (serverError) => {
          const permissionError = new FirestorePermissionError({
            path: subscribersRef.path,
            operation: 'create',
            requestResourceData: data,
          });
          errorEmitter.emit('permission-error', permissionError);
        });

    } else if (state.message && !state.success) {
      toast({
        title: 'Heads up!',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast, firestore]);
  
  const companyLinks = [
    { href: "/about", label: "About Us" },
    { href: "/news-and-events", label: "News & Events" },
    { href: "/sustainability", label: "Sustainability" },
    { href: "/collaborate", label: "Collaborate" },
    { href: "/contact", label: "Contact" },
    { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
    { href: "/business-portfolio", label: "Business Portfolio" },
    { href: "/privacy-policy", label: "Privacy Policy" },
  ];

  return (
    <footer className="bg-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-4 text-muted-foreground">
              Your Best Style, Expertly Curated. Sustainable fashion for the style-conscious.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="https://www.linkedin.com/company/aptlydressed" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
              </Link>
              <Link href="https://www.instagram.com/aptlydressed/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
              </Link>
              <Link href="https://www.facebook.com/aptlydressed/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 md:col-span-2 lg:col-span-2 gap-8">
            <div>
              <h3 className="font-semibold text-foreground">Shop</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/shop?category=Womens" className="text-muted-foreground hover:text-primary">Women</Link></li>
                <li><Link href="/shop?category=Mens" className="text-muted-foreground hover:text-primary">Men</Link></li>
                <li><Link href="/shop?category=Essentials" className="text-muted-foreground hover:text-primary">Essentials</Link></li>
                <li><Link href="/shop" className="text-muted-foreground hover:text-primary">All Products</Link></li>
                <li><Link href="/account" className="text-muted-foreground hover:text-primary">Login / Signup</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Company</h3>
              <ul className="mt-4 space-y-2">
                {companyLinks.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-span-1 md:col-span-4 lg:col-span-1">
            <h3 className="font-semibold text-foreground">Join our newsletter</h3>
            <p className="mt-2 text-muted-foreground">Get style inspiration and exclusive updates.</p>
            <form ref={formRef} action={formAction} className="mt-4 flex gap-2">
              <Input type="email" name="email" placeholder="Enter your email" className="bg-background" required />
              <SubmitButton />
            </form>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground space-y-2">
          <p>&copy; {currentYear} Aptly Dressed. An affiliate marketing partner.</p>
          <p>Powered by <a href="https://synctech.ie" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">SYNC TECH</a></p>
        </div>
      </div>
    </footer>
  );
}
