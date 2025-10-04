
import Image from 'next/image';
import type { Metadata } from 'next';
import { Handshake, Target, Gem, BarChart3, Mail } from 'lucide-react';

import { placeholderImages } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const collaborateHeroImage = placeholderImages.find(p => p.id === 'collaborate-hero');

export const metadata: Metadata = {
    title: 'Collaborate With Us | APTLY DRESSED',
    description: "Partner with APTLY DRESSED, a leading fashion affiliate destination. We connect discerning brands with a style-conscious audience passionate about quality, sustainability, and modern design. Let's collaborate.",
    keywords: ['fashion affiliate partnership', 'brand collaboration', 'influencer marketing', 'fashion marketing', 'partner with us', 'sustainable fashion brands'],
};

export default function CollaboratePage() {
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
          <h1 className="text-4xl md:text-6xl font-headline max-w-4xl">Partner with APTLY DRESSED</h1>
          <p className="mt-4 text-lg max-w-2xl">Align your brand with a trusted voice in sustainable and modern fashion. Let's create something beautiful together.</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 md:py-24 space-y-20">

        <section className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-headline">Why Partner With Us?</h2>
            <div className="prose prose-lg max-w-none mx-auto mt-4">
                <p>
                APTLY DRESSED is more than a fashion affiliate site; we are a destination for style-conscious millennials who seek quality, timeless design, and ethical production. We offer a unique platform for brands that share our ethos to connect with a highly engaged and targeted audience.
                </p>
            </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
                <CardHeader className="items-center text-center">
                    <Target className="h-10 w-10 text-primary mb-2" />
                    <CardTitle className="font-headline text-2xl">A Targeted, Engaged Audience</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-muted-foreground">Our readers are discerning consumers (ages 25-40) who actively seek out high-quality, sustainable, and modern fashion. They trust our curation and are ready to invest in brands that align with their values.</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="items-center text-center">
                    <Gem className="h-10 w-10 text-primary mb-2" />
                    <CardTitle className="font-headline text-2xl">Premium Brand Alignment</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-muted-foreground">Position your brand among a curated selection of the finest names in fashion. Our minimalist and elegant aesthetic provides the perfect backdrop to showcase the quality and craftsmanship of your products.</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="items-center text-center">
                    <BarChart3 className="h-10 w-10 text-primary mb-2" />
                    <CardTitle className="font-headline text-2xl">Authentic, Content-Driven Promotion</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-muted-foreground">We go beyond simple links. We integrate your products into authentic, high-quality content, including style guides, trend reports, and journal features that resonate with our audience and drive meaningful conversions.</p>
                </CardContent>
            </Card>
        </section>

        <section className="bg-muted -mx-4 px-4 py-16 md:-mx-8 md:px-8 md:py-24 rounded-lg">
             <div className="container mx-auto">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline">What We Look For</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                    We are selective in our partnerships to maintain the trust of our audience. We are excited to collaborate with brands that demonstrate a commitment to:
                    </p>
                    <ul className="mt-6 text-left list-disc list-inside inline-block">
                        <li>Exceptional quality and craftsmanship</li>
                        <li>Modern, timeless design principles</li>
                        <li>Sustainable materials and ethical production</li>
                        <li>A strong brand story and clear identity</li>
                    </ul>
                </div>
            </div>
        </section>

        <section className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-headline">Let's Collaborate</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                If you believe your brand is a perfect fit for the APTLY DRESSED audience, we would love to hear from you. We offer a range of partnership opportunities, from featured product placements to dedicated brand spotlights.
            </p>
            <div className="mt-8">
                <Button asChild size="lg">
                    <a href="mailto:aptlydressed@outlook.com">
                        <Mail className="mr-2 h-5 w-5" /> Get in Touch
                    </a>
                </Button>
            </div>
             <div className="mt-4 text-sm text-muted-foreground">
                <p>For partnership inquiries, please email us at <a href="mailto:aptlydressed@outlook.com" className="underline hover:text-primary">aptlydressed@outlook.com</a>.</p>
            </div>
        </section>
      </div>
    </div>
  );
}
