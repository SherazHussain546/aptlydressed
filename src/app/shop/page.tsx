import { productsPromise } from '@/lib/server-data';
import { Shop } from '@/components/products/Shop';
import type { Product } from '@/lib/types';

// This is a Server Component, so it can receive searchParams as a prop
export default async function ShopPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined }}) {
  const products: Product[] = await productsPromise;

  // Pass the searchParams down to the client component
  return <Shop allProducts={products} searchParams={searchParams} />;
}
