
'use client';
import Link from "next/link";
import { User } from "lucide-react";

import { Logo } from "@/components/icons/Logo";
import { Button } from "@/components/ui/button";
import { HeaderClient } from "./HeaderClient";
import { Search } from "./Search";

export function Header() {
  const mainNavLinks = [
    { href: "/contact", label: "Contact" },
  ];

  const shopCategories = [
      { href: "/shop", label: "All Products" },
      { href: "/shop?category=Womens", label: "Women" },
      { href: "/shop?category=Mens", label: "Men" },
      { href: "/shop?category=Essentials", label: "Essentials" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <HeaderClient mainNavLinks={mainNavLinks} shopCategories={shopCategories} />
          <div className="hidden md:block">
            <Logo />
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <HeaderClient showShopDropdown={true} shopCategories={shopCategories}/>
          {mainNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          <Logo />
        </div>

        <div className="flex items-center gap-2">
          <Search />
          <Button variant="ghost" size="icon" asChild>
            <Link href="/account">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
