
import { MetadataRoute } from 'next';
import { productsPromise } from '@/lib/server-data';
import { blogPosts } from '@/lib/data';
import { newsPosts } from '@/lib/news-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://aptlydressed.com';

  // Static pages
  const staticRoutes = [
    '/',
    '/about',
    '/shop',
    '/sustainability',
    '/contact',
    '/collaborate',
    '/faq',
    '/privacy-policy',
    '/affiliate-disclosure',
    '/account',
    '/blog',
    '/news-and-events',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 1 : 0.8,
  }));

  // Dynamic product pages
  const products = await productsPromise;
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Dynamic blog pages
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Dynamic news pages
  const newsRoutes = newsPosts.map((post) => ({
    url: `${baseUrl}/news-and-events/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes, ...newsRoutes];
}
