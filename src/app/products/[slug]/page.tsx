"use client";

import { useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Star, ChevronRight, CheckCircle } from 'lucide-react';

import { products } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useCart } from '@/contexts/CartProvider';
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
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { addToCart } = useCart();

  const product = products.find(p => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError("Please select a size.");
      return;
    }
    if (!selectedColor) {
      setError("Please select a color.");
      return;
    }
    setError(null);
    addToCart(product, selectedSize, selectedColor);
  };

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

          {/* Size Selector */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold mb-2">Size</h3>
            <RadioGroup onValueChange={setSelectedSize} value={selectedSize || ""}>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <div key={size}>
                    <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
                    <Label
                      htmlFor={`size-${size}`}
                      className={`flex items-center justify-center rounded-md border-2 px-4 py-2 text-sm cursor-pointer transition-colors
                        ${selectedSize === size ? 'border-primary bg-primary/10' : 'border-border'}`}
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Color Selector */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold mb-2">Color</h3>
            <RadioGroup onValueChange={setSelectedColor} value={selectedColor || ""}>
              <div className="flex flex-wrap gap-3">
                {product.colors.map(color => (
                  <div key={color.name}>
                    <RadioGroupItem value={color.name} id={`color-${color.name}`} className="sr-only" />
                    <Label
                      htmlFor={`color-${color.name}`}
                      className={`flex items-center justify-center rounded-full w-8 h-8 cursor-pointer border-2 transition-all
                        ${selectedColor === color.name ? 'border-primary scale-110' : 'border-transparent'}`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={color.name}
                    />
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

          <Button size="lg" className="w-full mt-8" onClick={handleAddToCart}>
            Add to Cart
          </Button>

          <div className="mt-6 text-sm text-muted-foreground flex items-center">
            <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
            <span>{product.stock > 0 ? `${product.stock} in stock - ships now` : 'Out of stock'}</span>
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
              <AccordionTrigger>Shipping & Returns</AccordionTrigger>
              <AccordionContent>
                Free shipping on orders over $50. Free returns within 30 days. Read our full policy for more details.
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
