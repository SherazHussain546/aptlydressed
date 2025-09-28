
import 'server-only';
import type { Product, Collection, BlogPost } from './types';
import { parse } from 'csv-parse/sync';

async function loadProductsFromGoogleSheet(): Promise<Product[]> {
  const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vScAauPk8eWS8LSllwq9Bo3aWi9UPlouqb2p0fi3cLKKWv7MeFCS2eO7Tlqbzf1C4BO4bqTS1MnpgbH/pub?output=csv';
  
  try {
    const response = await fetch(sheetUrl, { next: { revalidate: 3600 } }); // Re-fetch every hour
    if (!response.ok) {
      throw new Error(`Failed to fetch Google Sheet: ${response.statusText}`);
    }
    const csvData = await response.text();

    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      cast: (value, context) => {
        if (['price', 'rating', 'reviewCount', 'stock'].includes(context.column as string)) {
          const num = parseFloat(value);
          return isNaN(num) ? 0 : num;
        }
        if (['imageUrls', 'tags', 'sizes', 'details'].includes(context.column as string)) {
            if (!value) return [];
            return value.split(',').map(item => item.trim()).filter(Boolean);
        }
        if (context.column === 'colors') {
          if (!value) return [];
          return value.split(',').map(item => {
            const [name, hex] = item.split(':');
            return { name: name?.trim(), hex: hex?.trim() };
          }).filter(c => c.name && c.hex);
        }
        return value;
      }
    });

    return records as Product[];

  } catch (error) {
    console.error("Error loading products from Google Sheet:", error);
    return [];
  }
}

export const productsPromise: Promise<Product[]> = loadProductsFromGoogleSheet();

// This function will dynamically generate collections from product categories
export async function getCollections(): Promise<Collection[]> {
    const products = await productsPromise;
    const categories = Array.from(new Set(products.map(p => p.category)));

    const collectionImageMapping: Record<string, string> = {
        "Womens": "collection-women",
        "Mens": "collection-men",
        "Essentials": "collection-essentials",
    };
    const defaultImage = "collection-essentials";

    return categories.map((category, index) => ({
        id: (index + 1).toString(),
        title: `${category}`,
        href: `/shop?category=${category}`,
        imageId: collectionImageMapping[category] || defaultImage,
    }));
}
