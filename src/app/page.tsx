
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import { productsPromise, getCollections } from '@/lib/server-data';
import { placeholderImages } from '@/lib/data';

const heroImage = placeholderImages.find(p => p.id === 'hero-1');

export default async function Home() {
  const products = await productsPromise;
  const collections = await getCollections();
  
  const newArrivals = products.filter(p => p.tags.includes('New Arrival')).slice(0, 4);
  const featuredProducts = products.filter(p => p.tags.includes('Featured')).slice(0, 4);

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-headline mb-4">Timeless Elegance, Modern Edge</h1>
          <p className="max-w-2xl mb-8 text-lg">Discover our new collection, crafted for the style-conscious individual.</p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/shop">Shop Now</Link>
          </Button>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-headline text-center mb-8">New Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild variant="outline">
            <Link href="/shop">View All</Link>
          </Button>
        </div>
      </section>

      {/* Collections Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-headline text-center mb-8">Curated Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.slice(0,3).map(collection => {
            const collectionImage = placeholderImages.find(p => p.id === collection.imageId);
            return (
              <Link key={collection.id} href={collection.href} className="group relative h-96 block">
                {collectionImage && (
                  <Image
                    src={collectionImage.imageUrl}
                    alt={collectionImage.description}
                    fill
                    className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={collectionImage.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-black/40 rounded-lg" />
                <div className="relative h-full flex items-center justify-center">
                  <h3 className="text-3xl font-headline text-white">{collection.title}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-headline text-center mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
