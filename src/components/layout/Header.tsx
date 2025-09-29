"use client";

import Link from "next/link";
import { Search, User, Menu, ChevronDown } from "lucide-react";

import { Logo } from "@/components/icons/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const mainNavLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/sustainability", label: "Sustainability" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const shopCategories = [
    { href: "/shop", label: "All Products" },
    { href: "/shop?category=Womens", label: "Women" },
    { href: "/shop?category=Mens", label: "Men" },
    { href: "/shop?category=Essentials", label: "Essentials" },
];

export function Header() {

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <div className="flex flex-col gap-6 pt-8">
                  <div className="px-6">
                    <Logo />
                  </div>
                  <nav className="flex flex-col gap-2 px-6">
                     <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="shop">
                        <AccordionTrigger className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary hover:no-underline [&[data-state=open]>svg]:rotate-180">
                          Shop
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col gap-2 pl-4 pt-2">
                            {shopCategories.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                className="text-base font-medium text-foreground/70 transition-colors hover:text-primary"
                              >
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    
                    {mainNavLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary py-4"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden md:block">
            <Logo />
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 font-medium text-foreground/80 transition-colors hover:text-primary focus:outline-none">
                    Shop <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {shopCategories.map((link) => (
                        <DropdownMenuItem key={link.href} asChild>
                            <Link href={link.href}>{link.label}</Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

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
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
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
