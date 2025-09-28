"use client";

import { useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Star, ChevronRight, CheckCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';

import { products } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
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

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const productImages = product.imageIds.map(id => PlaceHolderImages.find(p => p.id === id)).filter(Boolean);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <>
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        {/* Image Gallery */}
        <div className="md:sticky md:top-24 h-max">
            <Carousel>
              <CarouselContent>
                {productImages.map((image, index) => image && (
                  <CarouselItem key={index}>
                    <Card className="overflow-hidden">
                      <CardContent className="p-0 aspect-[4/5] relative">
                        <Image
                          src={image.imageUrl}
                          alt={`${product.name} - view ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          data-ai-hint={image.imageHint}
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4"/>
              <CarouselNext className="right-4"/>
            </Carousel>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl lg:text-4xl font-headline">{product.name}</h1>
          <p className="text-2xl text-muted-foreground mt-2">${product.price.toFixed(2)}</p>
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
          {relatedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
