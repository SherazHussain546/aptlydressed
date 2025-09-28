
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const aboutHeroImage = PlaceHolderImages.find(p => p.id === 'about-hero');
const aboutStoryImage = PlaceHolderImages.find(p => p.id === 'about-story');

export default function AboutPage() {
  return (
    <div>
      <header className="relative h-[40vh] md:h-[50vh] w-full">
        {aboutHeroImage && (
          <Image
            src={aboutHeroImage.imageUrl}
            alt={aboutHeroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={aboutHeroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-headline max-w-4xl">Curating Style, Inspiring Confidence</h1>
          <p className="mt-4 text-lg max-w-2xl">We believe in the power of a well-curated wardrobe to simplify life and elevate the everyday.</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 md:py-24 space-y-16">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="prose lg:prose-lg max-w-none prose-h2:font-headline">
            <h2>Our Story</h2>
            <p>
              Aptly Dressed was born from a simple idea: that fashion should be intentional, sustainable, and timeless. In a world saturated with fleeting trends, we saw a need for a trusted voice to cut through the noise. We are not just another fashion site; we are your most trusted partner in style.
            </p>
            <p>
              Our journey began with a passion for discovering pieces that blend exceptional quality with modern design. We are dedicated to the art of curation, hand-selecting items from brands that share our commitment to craftsmanship and ethical practices.
            </p>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden">
            {aboutStoryImage && (
                 <Image
                    src={aboutStoryImage.imageUrl}
                    alt={aboutStoryImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={aboutStoryImage.imageHint}
                />
            )}
          </div>
        </section>

        <section className="bg-muted -mx-4 px-4 py-16 md:-mx-8 md:px-8 md:py-24 rounded-lg">
             <div className="container mx-auto">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline">Our Philosophy: The Art of Curation</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                    We navigate the world of fashion so you don't have to. Our philosophy is built on three core pillars that guide every recommendation we make.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-center">
                    <div>
                        <h3 className="text-2xl font-headline mb-2">Timeless over Trendy</h3>
                        <p className="text-muted-foreground">We focus on versatile, high-quality essentials that form the foundation of a sophisticated wardrobe, ensuring you look great today and for years to come.</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-headline mb-2">Quality over Quantity</h3>
                        <p className="text-muted-foreground">We champion mindful consumption by selecting pieces made with superior materials and craftsmanship, helping you build a wardrobe that lasts.</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-headline mb-2">Transparency & Trust</h3>
                        <p className="text-muted-foreground">Your trust is our most valued asset. We are committed to honesty in all our recommendations and partnerships.</p>
                    </div>
                </div>
            </div>
        </section>
        
        <section className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-headline">Our Commitment to Transparency</h2>
            <div className="prose prose-lg max-w-none mx-auto mt-4">
                <p>
                As a leading affiliate marketing partner, our integrity is the bedrock of our business. When you make a purchase through a link on our site, we may earn a small commission from the retailer, at absolutely no extra cost to you.
                </p>
                <p>
                This model allows us to dedicate our time to discovering and curating the very best in fashion, without cluttering your experience with ads. We only partner with brands that meet our high standards for quality and ethics. Our recommendations are always driven by our genuine belief in the product, not by commission rates. We're honored to be your guide in the world of fashion and are committed to earning your trust with every click.
                </p>
            </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-headline">Join Our Community</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Ready to elevate your style? Explore our curated collections and discover pieces you'll love forever.</p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/shop">Shop The Collections</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
