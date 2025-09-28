import type { ImagePlaceholder } from "./placeholder-images";

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  imageIds: string[];
  description: string;
  category: 'Womens' | 'Mens' | 'Essentials';
  tags: ('New Arrival' | 'Featured' | 'Best Seller')[];
  sizes: string[];
  colors: { name: string, hex: string }[];
  rating: number;
  reviewCount: number;
  details: string[];
  stock: number;
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

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}
