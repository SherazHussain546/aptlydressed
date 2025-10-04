

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  salePrice?: number;
  imageIds: string[];
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

export interface NewsPost {
  slug: string;
  title: string;
  date: string;
  imageId: string;
  content: string;
  hashtags: string[];
}

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Order {
    id: string;
    userId: string;
    orderDate: string; // ISO 8601 date string
    totalAmount: number;
    shippingAddress: string;
    orderItemIds: string[];
}
