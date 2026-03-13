
"use client";

import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { Shop } from '@/components/products/Shop';
import type { Product } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function ShopPage() {
  const firestore = useFirestore();
  const searchParams = useSearchParams();
  
  const productsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, "products"), orderBy("createdAt", "desc"));
  }, [firestore]);

  const { data: products, isLoading } = useCollection<Product>(productsQuery);

  const categoryParam = searchParams.get('category') || undefined;
  const tagsParam = searchParams.get('tags') || undefined;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground font-headline text-xl">Loading Boutique...</p>
      </div>
    );
  }

  return (
    <Shop 
      allProducts={products || []} 
      initialCategory={categoryParam} 
      initialTags={tagsParam} 
    />
  );
}
