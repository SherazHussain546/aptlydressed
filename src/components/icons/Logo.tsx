import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="font-headline text-2xl font-bold tracking-tight text-foreground transition-colors hover:text-primary">
      Aptly Dressed
    </Link>
  );
}
