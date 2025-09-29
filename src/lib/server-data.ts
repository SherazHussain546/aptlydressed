
import 'server-only';
import type { Product, Collection } from './types';
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
        if (['price', 'salePrice', 'rating', 'reviewCount', 'stock'].includes(context.column as string)) {
          if (value === '' || value === null) return undefined;
          const num = parseFloat(value);
          return isNaN(num) ? (context.column === 'salePrice' ? undefined : 0) : num;
        }
        if (['tags', 'sizes', 'details', 'imageIds'].includes(context.column as string)) {
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

    return records.map((record: any) => ({
      ...record,
    })) as Product[];

  } catch (error) {
    console.error("Error loading products from Google Sheet:", error);
    return [];
  }
}

async function loadCollectionsFromGoogleSheet(): Promise<Collection[]> {
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vScAauPk8eWS8LSllwq9Bo3aWi9UPlouqb2p0fi3cLKKWv7MeFCS2eO7Tlqbzf1C4BO4bqTS1MnpgbH/pub?gid=158529845&output=csv';
    const response = await fetch(sheetUrl, { next: { revalidate: 3600 } });
    if (!response.ok) {
        throw new Error(`Failed to fetch Collections Google Sheet: ${response.statusText}`);
    }
    const csvData = await response.text();
    const records = parse(csvData, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
    });
    return records as Collection[];
}

export const productsPromise: Promise<Product[]> = loadProductsFromGoogleSheet();

export async function getCollections(): Promise<Collection[]> {
    try {
        const collections = await loadCollectionsFromGoogleSheet();
        if (collections && collections.length > 0) {
            return collections;
        }
    } catch (error) {
        console.error("Error loading collections from Google Sheet, falling back to dynamic generation:", error);
    }

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
