
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SearchIcon, Loader2 } from "lucide-react";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { Product } from "@/lib/types";
import { placeholderImages } from "@/lib/data";
import { useDebounce } from "@/hooks/use-debounce";

export function Search() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  
  const firestore = useFirestore();
  const productsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, "products");
  }, [firestore]);

  const { data: allProducts, isLoading } = useCollection<Product>(productsQuery);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (debouncedQuery && allProducts) {
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(debouncedQuery.toLowerCase())
      ).slice(0, 10);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [debouncedQuery, allProducts]);

  const handleLinkClick = () => {
    setIsOpen(false);
    setQuery('');
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <SearchIcon className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Search Products</DialogTitle>
          <DialogDescription>
            Search for products, brands, or keywords. Results will appear below.
          </DialogDescription>
        </DialogHeader>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for products, brands, or keywords..."
            className="pl-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {isLoading ? (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        ) : (
          <div className="mt-4 max-h-[60vh] overflow-y-auto">
            {debouncedQuery && filteredProducts.length > 0 && (
              <div className="space-y-4">
                {filteredProducts.map(product => {
                  const onSale = product.salePrice && product.salePrice < product.price;
                  const primaryImage = product.images?.[0] || (product.imageIds && product.imageIds.length > 0 ? placeholderImages.find(p => p.id === product.imageIds[0])?.imageUrl : null);
                  return (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="flex items-center gap-4 p-2 -m-2 rounded-lg hover:bg-muted"
                    onClick={handleLinkClick}
                  >
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                      {primaryImage ? (
                        <Image
                          src={primaryImage}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
                          No Image
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.brand}</p>
                      <div className="mt-1 flex items-baseline gap-2">
                        {onSale ? (
                            <>
                                <p className="text-sm text-destructive font-semibold">${product.salePrice?.toFixed(2)}</p>
                                <p className="text-xs text-muted-foreground line-through">${product.price.toFixed(2)}</p>
                            </>
                        ) : (
                            <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                )})}
              </div>
            )}
            {debouncedQuery && filteredProducts.length === 0 && (
              <p className="py-8 text-center text-muted-foreground">
                No products found for "{debouncedQuery}".
              </p>
            )}
            {!debouncedQuery && (
                 <p className="py-8 text-center text-muted-foreground">
                    Start typing to search for products.
                </p>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
