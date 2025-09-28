
import type { ImagePlaceholder } from "./placeholder-images";

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  imageUrls: string[];
  description: string;
  category: 'Womens' | 'Mens' | 'Essentials' | string;
  tags: ('New Arrival' | 'Featured' | 'Best Seller' | string)[];
  sizes: string[];
  colors: { name: string, hex: string }[];
  rating: number;
  reviewCount: number;
  details: string[];
  stock: number;
  affiliateUrl: string;
}

export interface Collection {
  id: string;
  title: string;
  href: string;
  imageId: string;
}

export interface BlogPost {
  slug: string;
  title:string;
  author: string;
  date: string;
  imageId: string;
  excerpt: string;
  content: string;
}
