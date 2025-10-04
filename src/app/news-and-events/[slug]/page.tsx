
import { notFound } from 'next/navigation';
import { newsPosts } from '@/lib/news-data';
import { NewsPostPageClient } from '@/components/news/NewsPostPageClient';

export default function NewsPostPage({ params }: { params: { slug: string } }) {
  const post = newsPosts.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return <NewsPostPageClient post={post} />;
}
