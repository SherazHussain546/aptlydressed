import 'server-only';
import type { Product } from './types';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

async function loadProductsFromCSV(): Promise<Product[]> {
  const csvFilePath = path.join(process.cwd(), 'src', 'lib', 'products.csv');
  try {
    const csvData = fs.readFileSync(csvFilePath, 'utf-8');

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
    console.error("Error loading products from CSV:", error);
    // In case of error (e.g., file not found), return an empty array
    // to prevent the site from crashing.
    return [];
  }
}

export const productsPromise: Promise<Product[]> = loadProductsFromCSV();
