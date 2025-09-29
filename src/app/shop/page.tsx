import { productsPromise } from '@/lib/server-data';
import { Shop } from '@/components/products/Shop';

export default async function ShopPage() {
  const products = await productsPromise;

  return <Shop allProducts={products} />;
}
