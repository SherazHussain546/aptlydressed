
import Image from 'next/image';
import type { Metadata } from 'next';
import { placeholderImages } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Sustainability | Aptly Dressed',
    description: 'Learn about our commitment to sustainable fashion, from the materials we choose to the ethical production we demand from our partners.',
    keywords: ['sustainable fashion', 'ethical clothing', 'eco-friendly style', 'conscious consumerism'],
};

const sustainabilityHeroImage = placeholderImages.find(p => p.id === 'sustainability-hero');
const sustainabilityMaterialsImage = placeholderImages.find(p => p.id === 'sustainability-materials');


export default function SustainabilityPage() {
  return (
    <div>
      <header className="relative h-[40vh] md:h-[50vh] w-full">
        {sustainabilityHeroImage && (
          <Image
            src={sustainabilityHeroImage.imageUrl}
            alt={sustainabilityHeroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={sustainabilityHeroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-headline max-w-4xl">Style with a Conscience</h1>
          <p className="mt-4 text-lg max-w-2xl">We believe that true style shouldn't cost the earth. Discover our commitment to a more sustainable future for fashion.</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 md:py-24 space-y-20">
        <section className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-headline">Our Pledge for the Planet</h2>
            <div className="prose prose-lg max-w-none mx-auto mt-4">
                <p>
                At APTLY DRESSED, our love for fashion is matched by our deep respect for the planet and its people. We are dedicated to promoting a more thoughtful and sustainable approach to style. For us, this isn't a trend; it's a core principle that guides every recommendation we make. We believe that looking good and doing good should go hand in hand.
                </p>
                <p>
                We partner with brands that share our vision for a circular fashion economy, prioritizing environmental stewardship and ethical practices from the initial design to the final product. We seek out innovation that reduces waste, champions fair labor, and creates beautiful clothing that lasts.
                </p>
            </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden order-last md:order-first">
                {sustainabilityMaterialsImage && (
                    <Image
                        src={sustainabilityMaterialsImage.imageUrl}
                        alt={sustainabilityMaterialsImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={sustainabilityMaterialsImage.imageHint}
                    />
                )}
            </div>
            <div className="prose lg:prose-lg max-w-none prose-h2:font-headline">
                <h2>Our Sustainable Criteria</h2>
                <p>
                We carefully vet our partner brands based on a set of rigorous criteria to ensure they align with our values. We champion brands that are transparent about their supply chain and committed to making a positive impact. Here’s what we look for:
                </p>
                <ul>
                    <li><strong>Eco-Friendly Materials:</strong> We prioritize products made from sustainable and innovative materials like organic cotton, linen, Tencel™, and recycled fabrics. These choices minimize water usage, reduce pollution, and lower the carbon footprint of your wardrobe.</li>
                    <li><strong>Ethical Production:</strong> We partner with brands that ensure fair wages, safe working conditions, and respect for artisans throughout their supply chain. We believe that the people who make our clothes are just as important as the people who wear them.</li>
                    <li><strong>Timeless Design & Durability:</strong> In line with our core philosophy, we believe in buying better, not more. Our curated collections feature high-quality, timeless pieces designed to be cherished for years, reducing fashion waste and promoting mindful consumption.</li>
                </ul>
            </div>
        </section>

        <section className="bg-muted -mx-4 px-4 py-16 md:-mx-8 md:px-8 md:py-24 rounded-lg">
             <div className="container mx-auto">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline">Conscious Consumerism: Your Role in the Movement</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                    We empower you to make informed choices that reflect your values. By choosing pieces from our collections, you're not just elevating your wardrobe—you're supporting a global movement towards a more responsible and transparent fashion industry. Every purchase is a vote for the future you want to see.
                    </p>
                </div>
            </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-headline">Join Us on the Journey</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Ready to build a wardrobe that aligns with your values? Explore collections that are as kind to the planet as they are to your style.</p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/shop">Shop Sustainably</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
