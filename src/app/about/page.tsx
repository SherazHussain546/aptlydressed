
import Image from 'next/image';
import { placeholderImages } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const aboutHeroImage = placeholderImages.find(p => p.id === 'about-hero');
const aboutStoryImage = placeholderImages.find(p => p.id === 'about-story');

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
          <h1 className="text-4xl md:text-6xl font-headline max-w-4xl">Your Best Style, Expertly Curated.</h1>
          <p className="mt-4 text-lg max-w-2xl">We believe in the power of a well-curated wardrobe to simplify life and elevate the everyday.</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 md:py-24 space-y-16">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="prose lg:prose-lg max-w-none prose-h2:font-headline">
            <h2>A Message from Our Founders</h2>
            <p className="font-semibold">Shaharyar Hussain & Sheraz Hussain</p>
            <p>
                From our home base here in beautiful Dublin, Ireland, we started APTLY DRESSED with a shared, powerful conviction: that the secret to great style isn't about having more clothes, but about having the <em>right</em> clothes.
            </p>
            <p>
                The name APTLY DRESSED is the heart of our philosophy. ‘APTLY’ stands for Appropriate, and ‘DRESSED’ is for the art of dressing. Our mission is to guide you in finding the perfect, appropriate dress for any moment in your life—whether it’s for daily life, a vibrant festival, a special party, or a formal occasion.
            </p>
             <p>
                In a world of overwhelming choice, we act as your personal curators and trusted partners. Our commitment is to build a lasting relationship with you. We tirelessly search for the best affiliate products from head to toe, sourced from partners anywhere in the world who share our values. We don't just look for style; we look for substance.
            </p>
            <p>
                Every single item featured on APTLY DRESSED is hand-selected based on three uncompromising pillars: exceptional quality, true sustainability, and its power to be the perfect fit for your needs. Our promise is to bring you only the products we believe in, helping you build a wardrobe that is not only beautiful and mindful but also a true reflection of you. Thank you for trusting APTLY DRESSED. Let's redefine your style, together.
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
