import type { Collection, BlogPost } from './types';
import { productsPromise as serverProductsPromise } from './server-data';
import { PlaceHolderImages } from './placeholder-images';

export const productsPromise = serverProductsPromise;

// This function will dynamically generate collections from product categories
export async function getCollections(): Promise<Collection[]> {
    const products = await productsPromise;
    const categories = Array.from(new Set(products.map(p => p.category)));

    const collectionImageMapping: Record<string, string> = {
        "Womens": "collection-women",
        "Mens": "collection-men",
        "Essentials": "collection-essentials",
        // Add more mappings as needed
    };
    const defaultImage = "collection-essentials";

    return categories.map((category, index) => ({
        id: (index + 1).toString(),
        title: `${category}`,
        href: `/shop?category=${category}`,
        imageId: collectionImageMapping[category] || defaultImage,
    }));
}


export const blogPosts: BlogPost[] = [
  {
    slug: 'building-your-capsule-wardrobe',
    title: 'Building Your Capsule Wardrobe: A Guide to Mindful Fashion',
    author: 'Eleanor Vance',
    date: 'May 15, 2024',
    imageId: 'blog-1',
    excerpt: 'Simplify your life and refine your style with a capsule wardrobe. Learn how to select timeless, versatile pieces that you\'ll love for years to come.',
    content: '<p>In a world of fleeting trends, the concept of a capsule wardrobe offers a refreshing, sustainable alternative. It\'s about curating a collection of essential items that don\'t go out of style, which can then be augmented with seasonal pieces. The goal is to have an outfit suitable for any occasion without owning excessive items of clothing. This approach not only saves time and money but also reduces fashion waste.</p><p>Start by assessing your current wardrobe. What do you love? What do you actually wear? Be ruthless. A good capsule wardrobe is built on high-quality, versatile basics. Think neutral colors: black, white, grey, navy, and camel. For Aptly Dressed, our core palette of off-white, soft grey, and beige is the perfect starting point.</p><p>A classic white tee, a tailored blazer, a perfect-fitting pair of jeans, a little black dress, and a timeless trench coat are all excellent foundations. From there, you can inject personality with accent colors—like our signature deep burgundy—and accessories. The key is that every piece should be able to be mixed and matched with multiple other items in your wardrobe.</p>'
  },
  {
    slug: 'the-art-of-layering',
    title: 'The Art of Layering: Transitional Pieces for Every Season',
    author: 'Julian Finch',
    date: 'June 02, 2024',
    imageId: 'blog-2',
    excerpt: 'Master the art of layering to create stylish, adaptable outfits that can take you from a chilly morning to a warm afternoon. We break down the key pieces.',
    content: '<p>Layering is more than just piling on clothes; it\'s a stylistic art form that adds depth, texture, and versatility to your look. It\'s particularly useful during transitional seasons when the weather is unpredictable. The secret to successful layering is to work with thin layers and different textures.</p><p>Start with a quality base layer, like our Minimalist Tee in Pima cotton. It\'s breathable and soft against the skin. Next, add a middle layer for warmth and style. A piece like our Classic Oxford Shirt or Modernist Wool Sweater works perfectly. The final layer is your outerwear, which protects you from the elements. Our City-Chic Trench Coat is an ideal choice, as it\'s both stylish and functional.</p><p>Don\'t be afraid to play with lengths and textures. A silk blouse under a wool sweater, or a denim jacket over a maxi dress, creates visual interest. The key is to ensure each layer can stand on its own, so you can add or remove pieces as the temperature changes throughout the day.</p>'
  }
];
