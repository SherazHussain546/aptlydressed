"use client";

import React from 'react';
import Image from 'next/image';
import { Star, ExternalLink, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/lib/types';
import { placeholderImages } from '@/lib/data';

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductQuickView({ product, isOpen, onClose }: ProductQuickViewProps) {
  if (!product) return null;

  const onSale = product.salePrice && product.salePrice < product.price;
  const directImages = product.images || [];
  const placeholderImgs = product.imageIds ? product.imageIds.map(id => placeholderImages.find(p => p.id === id)?.imageUrl).filter(Boolean) as string[] : [];
  const allImages = [...directImages, ...placeholderImgs];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-6xl w-[95vw] h-[90vh] p-0 gap-0 border-none bg-background overflow-hidden flex flex-col md:flex-row">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        
        {/* Left Side: Fixed Image Gallery Section */}
        <div className="relative w-full md:w-1/2 h-[40vh] md:h-full bg-muted border-r border-border/50 overflow-hidden flex items-center justify-center">
          <Carousel className="w-full h-full" opts={{ loop: true, align: 'start' }}>
            <CarouselContent className="h-full m-0">
              {allImages.length > 0 ? allImages.map((imageUrl, index) => (
                <CarouselItem key={index} className="p-0 h-full">
                  <div className="relative w-full h-full">
                    <Image
                      src={imageUrl}
                      alt={`${product.name} - view ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index === 0}
                    />
                  </div>
                </CarouselItem>
              )) : (
                <CarouselItem className="h-full flex items-center justify-center bg-muted">
                  <p className="text-muted-foreground font-headline text-xl">No Image Available</p>
                </CarouselItem>
              )}
            </CarouselContent>
            {allImages.length > 1 && (
              <>
                <CarouselPrevious className="left-4 bg-white/80 hover:bg-white text-black border-none" />
                <CarouselNext className="right-4 bg-white/80 hover:bg-white text-black border-none" />
              </>
            )}
          </Carousel>
          
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
            {onSale && (
              <Badge variant="destructive" className="font-bold px-3 py-1 shadow-md">SALE</Badge>
            )}
            {product.tags?.map(tag => (
              <Badge key={tag} className="bg-primary text-primary-foreground border-none px-3 py-1 shadow-md">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Right Side: Scrollable Details Section */}
        <div className="w-full md:w-1/2 flex flex-col h-full overflow-hidden bg-background">
          <div className="flex-grow overflow-y-auto p-6 md:p-12 scrollbar-thin scrollbar-thumb-muted">
            <div className="mb-6">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{product.brand}</p>
              <h2 className="text-3xl md:text-5xl font-headline leading-tight">{product.name}</h2>
            </div>
            
            <div className="flex items-baseline gap-3 mb-6">
              {onSale ? (
                <>
                  <p className="text-3xl text-destructive font-bold">${product.salePrice?.toFixed(2)}</p>
                  <p className="text-xl text-muted-foreground line-through decoration-primary/30">${product.price.toFixed(2)}</p>
                </>
              ) : (
                <p className="text-3xl text-foreground font-medium">${product.price.toFixed(2)}</p>
              )}
            </div>

            <div className="flex items-center mb-8 pb-6 border-b border-border/50">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? 'text-primary fill-primary' : 'text-gray-200'}`} />
                ))}
              </div>
              <p className="ml-3 text-sm text-muted-foreground font-medium">({product.reviewCount} verified reviews)</p>
            </div>

            <div className="prose prose-sm max-w-none text-foreground/80 mb-10 leading-relaxed">
              <p className="text-base">{product.description}</p>
            </div>

            {product.details && product.details.length > 0 && (
              <div className="mb-10">
                <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-foreground/60">Product Highlights</h4>
                <ul className="grid grid-cols-1 gap-3">
                  {product.details.map((detail, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/40 mt-1.5 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Fixed Footer Action Area */}
          <div className="p-6 md:px-12 border-t border-border/50 bg-background/95 backdrop-blur-sm space-y-4">
            <Button size="lg" className="w-full h-14 text-lg font-headline tracking-wide rounded-none" asChild>
              <Link href={product.affiliateUrl} target="_blank" onClick={() => onClose()}>
                Shop on Partner Site <ExternalLink className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <div className="text-[10px] text-center text-muted-foreground italic leading-tight">
              You will be redirected to our trusted partner brand to securely complete your purchase.
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
