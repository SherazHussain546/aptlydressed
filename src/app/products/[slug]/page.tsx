
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Star, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

import { productsPromise } from '@/lib/server-data';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ProductCard } from '@/components/products/ProductCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from '@/components/ui/card';
import { placeholderImages } from '@/lib/data';

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const products = await productsPromise;
  const product = products.find(p => p.slug === params.slug);

  if (!product) {
    return {
      title: 'Product not found',
    }
  }

  const primaryImage = product.imageIds && product.imageIds.length > 0 ? placeholderImages.find(p => p.id === product.imageIds[0]) : null;

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: primaryImage ? [
        {
          url: primaryImage.imageUrl,
          width: 800,
          height: 1000,
          alt: product.name,
        },
      ] : [],
    },
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const products = await productsPromise;
  const product = products.find(p => p.slug === params.slug);

  if (!product) {
    notFound();
  }
  
  const onSale = product.salePrice && product.salePrice < product.price;
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const productImages = product.imageIds ? product.imageIds.map(id => placeholderImages.find(p => p.id === id)).filter(Boolean) : [];

  return (
    <>
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        {/* Image Gallery */}
        <div className="md:sticky md:top-24 h-max">
            <Carousel>
              <CarouselContent>
                {productImages.length > 0 ? productImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <Card className="overflow-hidden">
                      <CardContent className="p-0 aspect-[4/5] relative">
                        {image && (
                            <Image
                                src={image.imageUrl}
                                alt={`${product.name} - view ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                data-ai-hint={image.imageHint}
                            />
                        )}
                      </CardContent>
                    </Card>
                  </CarouselItem>
                )) : (
                  <CarouselItem>
                    <Card className="overflow-hidden">
                      <CardContent className="p-0 aspect-[4/5] relative bg-muted flex items-center justify-center">
                        <p className="text-muted-foreground">No Image</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                )}
              </CarouselContent>
              {productImages.length > 1 && (
                <>
                  <CarouselPrevious className="left-4"/>
                  <CarouselNext className="right-4"/>
                </>
              )}
            </Carousel>
        </div>

        {/* Product Details */}
        <div>
          <p className="text-sm font-medium text-muted-foreground">{product.brand}</p>
          <h1 className="text-3xl lg:text-4xl font-headline mt-1">{product.name}</h1>
          
          <div className="mt-2 flex items-baseline gap-2">
            {onSale ? (
                <>
                    <p className="text-2xl text-destructive font-semibold">${product.salePrice?.toFixed(2)}</p>
                    <p className="text-xl text-muted-foreground line-through">${product.price.toFixed(2)}</p>
                </>
            ) : (
                <p className="text-2xl text-muted-foreground">${product.price.toFixed(2)}</p>
            )}
          </div>

          <div className="flex items-center mt-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <p className="ml-2 text-sm text-muted-foreground">({product.reviewCount} reviews)</p>
          </div>

          <p className="mt-6 text-lg text-foreground/80">{product.description}</p>
          
          <Button size="lg" className="w-full mt-8" asChild>
            <Link href={product.affiliateUrl} target="_blank">
              Buy Now <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>

           <div className="mt-4 text-xs text-center text-muted-foreground">
            You will be redirected to our partner site to complete your purchase.
          </div>


          <Accordion type="single" collapsible className="w-full mt-8">
            <AccordionItem value="details">
              <AccordionTrigger>Product Details</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  {product.details.map((detail, i) => <li key={i}>{detail}</li>)}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger>Affiliate Disclosure</AccordionTrigger>
              <AccordionContent>
               As an affiliate, we may earn a commission from qualifying purchases. This does not affect the price you pay.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
    
    {/* Related Products */}
    <section className="bg-muted py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-headline text-center mb-8">You might also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
