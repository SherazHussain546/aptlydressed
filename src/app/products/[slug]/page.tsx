
"use client";

import { useFirestore, useCollection, useDoc, useMemoFirebase } from "@/firebase";
import { collection, query, where, limit, doc } from "firebase/firestore";
import Image from 'next/image';
import { useParams, notFound } from 'next/navigation';
import { Star, ExternalLink, Loader2 } from 'lucide-react';
import Link from 'next/link';
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
import { getOutfitRecommendations } from '@/ai/flows/ai-outfit-recommendation';
import type { Product } from '@/lib/types';
import { useEffect, useState } from 'react';

function CompleteTheLook({ product, allProducts }: { product: Product, allProducts: Product[] }) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecs() {
      try {
        const allProductNames = allProducts.map(p => p.name);
        const result = await getOutfitRecommendations({
          productName: product.name,
          productDescription: product.description,
          allProductNames,
        });
        
        const recommendedProducts = result.recommendations
          .map(recName => allProducts.find(p => p.name === recName))
          .filter((p): p is Product => !!p);

        setRecommendations(recommendedProducts);
      } catch (error) {
        console.error("Error getting outfit recommendations:", error);
      } finally {
        setLoading(false);
      }
    }
    if (product && allProducts.length > 0) {
      fetchRecs();
    }
  }, [product, allProducts]);

  if (loading || recommendations.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-headline text-center mb-12 italic">Complete the Look</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12 max-w-3xl mx-auto">
          {recommendations.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const firestore = useFirestore();

  // Try fetching by slug field
  const productQuery = useMemoFirebase(() => {
    if (!firestore || !slug) return null;
    return query(collection(firestore, "products"), where("slug", "==", slug), limit(1));
  }, [firestore, slug]);

  // Fallback: Try fetching by Document ID
  const productDocRef = useMemoFirebase(() => {
    if (!firestore || !slug) return null;
    return doc(firestore, "products", slug);
  }, [firestore, slug]);

  const allProductsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, "products");
  }, [firestore]);

  const { data: productBySlug, isLoading: loadingSlug } = useCollection<Product>(productQuery);
  const { data: productById, isLoading: loadingId } = useDoc<Product>(productDocRef);
  const { data: allProducts } = useCollection<Product>(allProductsQuery);

  if (loadingSlug && loadingId) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // Determine the product (either by slug query result or direct ID lookup)
  const product = (productBySlug && productBySlug.length > 0) ? productBySlug[0] : productById;

  if (!product) {
    notFound();
  }
  
  const onSale = product.salePrice && product.salePrice < product.price;
  const relatedProducts = (allProducts || []).filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  
  const directImages = product.images || [];
  const placeholderImgs = product.imageIds ? product.imageIds.map(id => placeholderImages.find(p => p.id === id)?.imageUrl).filter(Boolean) as string[] : [];
  const allImages = [...directImages, ...placeholderImgs];

  return (
    <>
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        {/* Image Gallery */}
        <div className="md:sticky md:top-24 h-max">
            <Carousel>
              <CarouselContent>
                {allImages.length > 0 ? allImages.map((imageUrl, index) => (
                  <CarouselItem key={index}>
                    <Card className="overflow-hidden border-none shadow-none">
                      <CardContent className="p-0 aspect-[4/5] relative rounded-xl overflow-hidden bg-muted">
                        <Image
                            src={imageUrl}
                            alt={`${product.name} - view ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority={index === 0}
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                )) : (
                  <CarouselItem>
                    <Card className="overflow-hidden border-none shadow-none">
                      <CardContent className="p-0 aspect-[4/5] relative bg-muted flex items-center justify-center rounded-xl">
                        <p className="text-muted-foreground font-headline text-xl">No Image Available</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                )}
              </CarouselContent>
              {allImages.length > 1 && (
                <>
                  <CarouselPrevious className="left-4"/>
                  <CarouselNext className="right-4"/>
                </>
              )}
            </Carousel>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">{product.brand}</p>
          <h1 className="text-4xl lg:text-5xl font-headline mt-2">{product.name}</h1>
          
          <div className="mt-4 flex items-baseline gap-3">
            {onSale ? (
                <>
                    <p className="text-3xl text-destructive font-bold">${product.salePrice?.toFixed(2)}</p>
                    <p className="text-xl text-muted-foreground line-through decoration-primary/30">${product.price.toFixed(2)}</p>
                </>
            ) : (
                <p className="text-3xl text-foreground font-medium">${product.price.toFixed(2)}</p>
            )}
          </div>

          <div className="flex items-center mt-6 py-2 border-y border-border/50">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? 'text-primary fill-primary' : 'text-gray-200'}`} />
              ))}
            </div>
            <p className="ml-3 text-sm text-muted-foreground font-medium">({product.reviewCount} verified reviews)</p>
          </div>

          <div className="mt-8 prose prose-lg max-w-none text-foreground/80">
            <p>{product.description}</p>
          </div>
          
          <Button size="lg" className="w-full mt-10 h-14 text-lg font-headline tracking-wide" asChild>
            <Link href={product.affiliateUrl} target="_blank">
              Shop on Partner Site <ExternalLink className="ml-2 h-5 w-5" />
            </Link>
          </Button>

           <div className="mt-4 text-xs text-center text-muted-foreground italic">
            You will be redirected to our trusted partner brand to secure your purchase.
          </div>


          <Accordion type="single" collapsible className="w-full mt-12 border-t">
            <AccordionItem value="details" className="border-b">
              <AccordionTrigger className="font-headline text-xl">Product Specifications</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-base">
                  {product.details?.map((detail, i) => <li key={i}>{detail}</li>)}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping" className="border-b">
              <AccordionTrigger className="font-headline text-xl">Affiliate Disclosure</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
               APTLY DRESSED is a boutique affiliate platform. When you purchase through our links, we may earn a small commission from the brand. This supports our curation efforts at no additional cost to you.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>

    {/* AI Outfit Recommendations */}
    <CompleteTheLook product={product} allProducts={allProducts || []} />
    
    {/* Related Products */}
    <section className="bg-muted/20 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-headline text-center mb-12">More to Explore</h2>
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
