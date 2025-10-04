
import Image from 'next/image';
import type { Metadata } from 'next';
import { placeholderImages } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'Affiliate Disclosure | APTLY DRESSED',
    description: "Learn about our commitment to transparency and our affiliate partnership model. We connect you with the best in modern fashion, powered by SYNC TECH.",
};

const collaborateHeroImage = placeholderImages.find(p => p.id === 'collaborate-hero');

export default function AffiliateDisclosurePage() {
  return (
    <div>
       <header className="relative h-[40vh] md:h-[50vh] w-full">
        {collaborateHeroImage && (
          <Image
            src={collaborateHeroImage.imageUrl}
            alt={collaborateHeroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={collaborateHeroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-headline max-w-4xl">Our Commitment to Transparency</h1>
          <p className="mt-4 text-lg max-w-2xl">Trust is the foundation of our brand. Here’s how we work.</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
            <div className="prose lg:prose-lg max-w-none prose-h2:font-headline">
                <h2>Our Affiliate Marketing Model</h2>
                <p>
                At APTLY DRESSED, our mission is to bring you the best in modern, sustainable, and timeless fashion. To do this, we partner with a curated selection of high-quality brands and retailers. When you click on a link from our site and make a purchase, we may earn a small commission from that retailer, at absolutely no extra cost to you.
                </p>
                <p>
                This affiliate model is the backbone of our business. It allows us to dedicate our time and expertise to discovering, vetting, and showcasing products that we genuinely believe are the best fit for you. We are not just a passive directory; we are your expert curators in the vast world of fashion.
                </p>
                
                <h2>Our Promise to You</h2>
                <p>
                Our recommendations are, and will always be, driven by our editorial integrity, not by commission rates. We only feature products and brands that meet our rigorous standards for quality, style, and ethical production. We believe in bringing you what we find to be the best and most suitable choices to help you build a wardrobe you love. Your trust is our most valuable asset, and we are committed to upholding it with every recommendation we make.
                </p>

                <h2>Powered by SYNC TECH</h2>
                <p>
                This seamless digital experience is powered by our technology partners at <a href="https://synctech.ie" target="_blank" rel="noopener noreferrer">SYNC TECH</a>. Their expertise helps us bring our vision of curated style to life, ensuring our platform is as well-crafted as the fashion we feature.
                </p>
            </div>
            <div className="mt-12 text-center">
                <Button asChild size="lg">
                    <Link href="/shop">Explore The Collections</Link>
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
