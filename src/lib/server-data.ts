
import 'server-only';
import type { Product, Collection } from './types';
import { firestore } from '@/lib/firebase-admin';

async function loadProductsFromFirestore(): Promise<Product[]> {
  try {
    const snapshot = await firestore.collection('products').orderBy('createdAt', 'desc').get();
    if (snapshot.empty) {
      console.log('No products found in Firestore.');
      return [];
    }
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  } catch (error) {
    console.error("Error loading products from Firestore:", error);
    return [];
  }
}

export const productsPromise: Promise<Product[]> = loadProductsFromFirestore();

export async function getCollections(): Promise<Collection[]> {
    // For an affiliate aggregator, collections are often just categories
    const products = await productsPromise;
    const categories = Array.from(new Set(products.map(p => p.category)));
    
    const collectionImageMapping: Record<string, string> = {
        "Womens": "collection-women",
        "Mens": "collection-men",
        "Essentials": "collection-essentials",
        "Shoes": "collection-essentials",
    };
    const defaultImage = "collection-essentials";

    return categories.map((category, index) => ({
        id: (index + 1).toString(),
        title: `${category}`,
        href: `/shop?category=${category}`,
        imageId: collectionImageMapping[category] || defaultImage,
    }));
}
