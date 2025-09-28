import { notFound } from 'next/navigation';
import Image from 'next/image';
import { blogPosts } from '@/lib/server-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const image = PlaceHolderImages.find(p => p.id === post.imageId);

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
