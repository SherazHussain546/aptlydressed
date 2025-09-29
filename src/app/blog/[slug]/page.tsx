
import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { blogPosts, placeholderImages } from '@/lib/data';

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
      </div>
    </article>
  );
}
