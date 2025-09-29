
"use client";

import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";

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

type NavLink = {
  href: string;
  label: string;
};

interface HeaderClientProps {
  mainNavLinks?: NavLink[];
  newArrivalsCategories?: NavLink[];
  showShopDropdown?: boolean;
}

export function HeaderClient({ mainNavLinks, newArrivalsCategories = [], showShopDropdown = false }: HeaderClientProps) {

  if (showShopDropdown) {
    return (
      <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 font-medium text-foreground/80 transition-colors hover:text-primary focus:outline-none">
              New Arrivals <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
              {newArrivalsCategories.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                      <Link href={link.href}>{link.label}</Link>
                  </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
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
                <AccordionItem value="new-arrivals">
                    <AccordionTrigger className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary hover:no-underline [&[data-state=open]>svg]:rotate-180">
                    New Arrivals
                    </AccordionTrigger>
                    <AccordionContent>
                    <div className="flex flex-col gap-2 pl-4 pt-2">
                        {newArrivalsCategories.map((link) => (
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
                
                {mainNavLinks && mainNavLinks.map((link) => (
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
  );
}
