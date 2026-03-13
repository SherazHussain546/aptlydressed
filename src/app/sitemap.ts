
import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/data';
import { newsPosts } from '@/lib/news-data';

/**
 * Since we fetch product data on the client side exclusively,
 * we provide a static sitemap for core pages. Dynamic product routes
 * are indexed as Google crawls the shop and categories.
 */
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

  return [...staticRoutes, ...blogRoutes, ...newsRoutes];
}
