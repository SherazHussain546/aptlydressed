"use client";

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
      <DialogContent className="max-w-4xl w-[95vw] h-[90vh] md:h-auto overflow-y-auto p-0 gap-0 border-none bg-background">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative bg-muted aspect-[4/5] md:aspect-auto">
            <Carousel className="w-full h-full">
              <CarouselContent className="h-full m-0">
                {allImages.length > 0 ? allImages.map((imageUrl, index) => (
                  <CarouselItem key={index} className="p-0 h-full">
                    <div className="relative w-full h-full min-h-[400px]">
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
                  <CarouselItem className="flex items-center justify-center bg-muted h-full">
                    <p className="text-muted-foreground font-headline text-xl">No Image Available</p>
                  </CarouselItem>
                )}
              </CarouselContent>
              {allImages.length > 1 && (
                <>
                  <CarouselPrevious className="left-4 opacity-70 hover:opacity-100 transition-opacity" />
                  <CarouselNext className="right-4 opacity-70 hover:opacity-100 transition-opacity" />
                </>
              )}
            </Carousel>
            
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {onSale && (
                <Badge variant="destructive" className="font-bold">SALE</Badge>
              )}
              {product.tags?.map(tag => (
                <Badge key={tag} className="bg-primary text-primary-foreground border-none">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6 md:p-8 flex flex-col h-full">
            <div className="flex-grow">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">{product.brand}</p>
              <h2 className="text-3xl md:text-4xl font-headline leading-tight mb-4">{product.name}</h2>
              
              <div className="flex items-baseline gap-3 mb-6">
                {onSale ? (
                  <>
                    <p className="text-2xl text-destructive font-bold">${product.salePrice?.toFixed(2)}</p>
                    <p className="text-lg text-muted-foreground line-through decoration-primary/30">${product.price.toFixed(2)}</p>
                  </>
                ) : (
                  <p className="text-2xl text-foreground font-medium">${product.price.toFixed(2)}</p>
                )}
              </div>

              <div className="flex items-center mb-6 pb-4 border-b border-border/50">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? 'text-primary fill-primary' : 'text-gray-200'}`} />
                  ))}
                </div>
                <p className="ml-3 text-sm text-muted-foreground">({product.reviewCount} reviews)</p>
              </div>

              <div className="prose prose-sm max-w-none text-muted-foreground line-clamp-6 mb-8">
                <p>{product.description}</p>
              </div>

              {product.details && product.details.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-wider mb-2">Specifications</h4>
                  <ul className="grid grid-cols-1 gap-1">
                    {product.details.slice(0, 4).map((detail, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary/40 mt-1.5 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Button size="lg" className="w-full h-14 text-lg font-headline tracking-wide" asChild>
                <Link href={product.affiliateUrl} target="_blank" onClick={() => onClose()}>
                  Shop on Partner Site <ExternalLink className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <p className="text-[10px] text-center text-muted-foreground italic px-4 leading-tight">
                Clicking will redirect you to our trusted partner brand to securely complete your purchase.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
