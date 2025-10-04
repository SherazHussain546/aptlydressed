
import { productsPromise } from '@/lib/server-data';
import { Shop } from '@/components/products/Shop';
import type { Product } from '@/lib/types';

// This is a Server Component, so it can receive searchParams as a prop
export default async function ShopPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined }}) {
  const products: Product[] = await productsPromise;
  
  // Extract specific search params on the server to avoid passing the searchParams object to the client.
  const categoryParam = typeof searchParams?.['category'] === 'string' ? searchParams['category'] : undefined;
  const tagsParam = typeof searchParams?.['tags'] === 'string' ? searchParams['tags'] : undefined;

  // Pass the extracted values down to the client component as simple props.
  return <Shop allProducts={products} initialCategory={categoryParam} initialTags={tagsParam} />;
}
