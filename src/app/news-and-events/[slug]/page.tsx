
import { notFound } from 'next/navigation';
import { newsPosts } from '@/lib/news-data';
import { NewsPostPageClient } from '@/components/news/NewsPostPageClient';
import { placeholderImages } from '@/lib/data';

export default function NewsPostPage({ params }: { params: { slug: string } }) {
  const post = newsPosts.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const image = placeholderImages.find(p => p.id === post.imageId);

  return (
    <NewsPostPageClient
      title={post.title}
      date={post.date}
      content={post.content}
      hashtags={post.hashtags}
      slug={post.slug}
      image={image}
    />
  );
}
