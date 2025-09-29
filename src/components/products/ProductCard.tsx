
import Image from 'next/image';
import Link from 'next/link';

import type { Product } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.imageIds && product.imageIds.length > 0
    ? PlaceHolderImages.find(p => p.id === product.imageIds[0])
    : null;
  const onSale = product.salePrice && product.salePrice < product.price;

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="overflow-hidden rounded-lg">
        <div className="relative aspect-[4/5] bg-muted">
          {primaryImage ? (
            <Image
              src={primaryImage.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              data-ai-hint={primaryImage.imageHint}
            />
          ) : (
             <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                No Image
             </div>
          )}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {onSale && (
                <Badge className={cn("border-none", "bg-destructive text-destructive-foreground")}>
                  Sale
                </Badge>
            )}
            {product.tags && product.tags.map(tag => (
              <Badge 
                key={tag}
                className={cn(
                  "border-none",
                  tag === 'New Arrival' && 'bg-accent text-accent-foreground',
                  tag === 'Best Seller' && 'bg-primary text-primary-foreground'
                )}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-xs text-muted-foreground">{product.brand}</p>
        <h3 className="font-medium text-foreground transition-colors group-hover:text-primary">{product.name}</h3>
        <div className="mt-1 flex items-baseline gap-2">
            {onSale ? (
                <>
                    <p className="text-destructive font-semibold">${product.salePrice?.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</p>
                </>
            ) : (
                <p className="text-muted-foreground">${product.price.toFixed(2)}</p>
            )}
        </div>
      </div>
    </Link>
  );
}
