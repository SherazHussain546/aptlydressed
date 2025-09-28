import Image from 'next/image';
import Link from 'next/link';

import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImageId = product.imageIds[0];
  const primaryImage = PlaceHolderImages.find(p => p.id === primaryImageId);

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="overflow-hidden rounded-lg">
        <div className="relative aspect-[4/5] bg-muted">
          {primaryImage && (
            <Image
              src={primaryImage.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              data-ai-hint={primaryImage.imageHint}
            />
          )}
          {product.tags.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.tags.map(tag => (
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
          )}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-medium text-foreground transition-colors group-hover:text-primary">{product.name}</h3>
        <p className="mt-1 text-muted-foreground">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
