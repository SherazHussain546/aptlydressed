
'use client';

import Image from 'next/image';
import { placeholderImages } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import type { NewsPost } from '@/lib/types';
import { NewsPostShareButtons } from './NewsPostShareButtons';

export function NewsPostPageClient({ post }: { post: NewsPost }) {
  const image = placeholderImages.find(p => p.id === post.imageId);

  return (
    <article className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
                <div>
                    <p className="font-semibold">APTLY DRESSED</p>
                    <p className="text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            </div>
          <h1 className="text-4xl md:text-5xl font-headline mt-4">{post.title}</h1>
        </header>
        
        {image && (
          <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
            <Image
              src={image.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
              data-ai-hint={image.imageHint}
            />
          </div>
        )}

        <div
          className="prose lg:prose-lg max-w-none prose-h2:font-headline prose-p:text-foreground/80"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-8 pt-8 border-t space-y-6">
            {post.hashtags && post.hashtags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-sm">Tags:</p>
                    {post.hashtags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                </div>
            )}
            
            <NewsPostShareButtons post={post} isFullPage={true} />
        </div>
      </div>
    </article>
  );
}
