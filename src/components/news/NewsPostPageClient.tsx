
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Twitter, Facebook, Linkedin, Copy } from 'lucide-react';
import { placeholderImages } from '@/lib/data';
import { Logo } from '@/components/icons/Logo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { NewsPost } from '@/lib/types';

export function NewsPostPageClient({ post }: { post: NewsPost }) {
  const pathname = usePathname();
  const { toast } = useToast();
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    setShareUrl(`${window.location.origin}${pathname}`);
  }, [pathname]);

  const image = placeholderImages.find(p => p.id === post.imageId);

  const copyLink = () => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    toast({
        title: "Link Copied!",
        description: "The link to this post has been copied to your clipboard.",
    });
  }

  return (
    <article className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Logo />
          </div>
          <p className="text-muted-foreground text-sm">Published on {post.date}</p>
          <h1 className="text-4xl md:text-5xl font-headline mt-2">{post.title}</h1>
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

        <div className="mt-8 pt-8 border-t">
            {post.hashtags && post.hashtags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                    <p className="font-semibold">Tags:</p>
                    {post.hashtags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                </div>
            )}
            
            <div className="flex items-center gap-4">
                <p className="font-semibold">Share this post:</p>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" asChild>
                        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer">
                            <Twitter className="h-4 w-4" />
                        </a>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">
                            <Facebook className="h-4 w-4" />
                        </a>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                        <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-4 w-4" />
                        </a>
                    </Button>
                    <Button variant="outline" size="icon" onClick={copyLink} disabled={!shareUrl}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </article>
  );
}
