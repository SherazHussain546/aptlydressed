
import Image from 'next/image';
import Link from 'next/link';
import { newsPosts } from '@/lib/news-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function NewsAndEventsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-headline">News & Events</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Updates, announcements, and stories from Aptly Dressed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsPosts.map(post => {
          const image = PlaceHolderImages.find(p => p.id === post.imageId);
          return (
            <Card key={post.slug} className="flex flex-col overflow-hidden">
                <Link href={`/news-and-events/${post.slug}`} className="block group">
                    <div className="relative aspect-video bg-muted">
                        {image && (
                            <Image
                            src={image.imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={image.imageHint}
                            />
                        )}
                    </div>
                </Link>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">
                  <Link href={`/news-and-events/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </CardTitle>
                <p className="text-sm text-muted-foreground pt-1">
                  Published on {post.date}
                </p>
              </CardHeader>
              <CardContent className="flex-grow">
                <div
                    className="text-muted-foreground line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </CardContent>
              <CardFooter>
                <Button asChild variant="link" className="p-0 h-auto">
                  <Link href={`/news-and-events/${post.slug}`}>
                    Read More
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
