import { productsPromise } from '@/lib/server-data';
import { Shop } from '@/components/products/Shop';

export default async function ShopPage() {
  const products = await productsPromise;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-headline">Shop</h1>
        <p className="mt-2 text-muted-foreground">Discover our collection of timeless pieces.</p>
      </div>
      <Shop allProducts={products} />
    </div>
  );
}
