
import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { blogPosts, placeholderImages } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { NewsPostShareButtons } from '@/components/news/NewsPostShareButtons';

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Post not found',
    }
  }
  
  const image = placeholderImages.find(p => p.id === post.imageId);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: image ? [
        {
          url: image.imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ] : [],
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const image = placeholderImages.find(p => p.id === post.imageId);

  // The share button component expects a NewsPost type, but it only uses slug and title which are also in BlogPost.
  // We can safely cast it for this use case.
  const postForSharing = {
    slug: post.slug,
    title: post.title,
    date: post.date,
    imageId: post.imageId,
    content: post.content,
    hashtags: [],
  };

  return (
    <article>
      <header className="relative h-[40vh] md:h-[50vh] w-full">
        {image && (
            <Image
            src={image.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
            data-ai-hint={image.imageHint}
            />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-headline max-w-4xl">{post.title}</h1>
          <p className="mt-4 text-lg">By {post.author} &bull; {post.date}</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 md:py-16">
        <div
          className="prose lg:prose-lg max-w-3xl mx-auto prose-h2:font-headline prose-p:text-foreground/80 prose-a:text-primary hover:prose-a:text-primary/80"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="max-w-3xl mx-auto mt-8 pt-8 border-t space-y-6">
            <div className="text-center">
                <Button asChild>
                    <Link href="https://www.blogger.com" target="_blank" rel="noopener noreferrer">
                        Read The Blog on Blogger.com
                    </Link>
                </Button>
            </div>
            <NewsPostShareButtons post={postForSharing} isFullPage={true} />
        </div>
      </div>
    </article>
  );
}
