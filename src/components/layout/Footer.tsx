"use client";

import { useEffect, useRef, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Twitter, Instagram, Facebook, Loader2 } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/icons/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeToNewsletter } from "@/app/actions/newsletter";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : 'Subscribe'}
    </Button>
  );
}

export function Footer() {
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
    <footer className="bg-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-4 text-muted-foreground">
              Timeless elegance, modern edge. Sustainable fashion for the style-conscious.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
              </Link>
              <Link href="#" aria-label="Facebook">
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
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                <li><Link href="/news-and-events" className="text-muted-foreground hover:text-primary">News & Events</Link></li>
                <li><Link href="/sustainability" className="text-muted-foreground hover:text-primary">Sustainability</Link></li>
                <li><Link href="/collaborate" className="text-muted-foreground hover:text-primary">Collaborate</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
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
          <p>&copy; {new Date().getFullYear()} Aptly Dressed. An affiliate marketing partner.</p>
          <p>Powered by <a href="https://synctech.ie" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">SYNC TECH</a></p>
        </div>
      </div>
    </footer>
  );
}
