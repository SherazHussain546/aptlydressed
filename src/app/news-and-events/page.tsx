
import Image from 'next/image';
import Link from 'next/link';
import { newsPosts } from '@/lib/news-data';
import { placeholderImages } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Logo } from '@/components/icons/Logo';
import { Twitter, Facebook, Linkedin, Copy } from 'lucide-react';
import { NewsPostShareButtons } from '@/components/news/NewsPostShareButtons';


export default function NewsAndEventsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-headline">News & Events by APTLY DRESSED</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Live updates, announcements, and stories from the world of Aptly Dressed.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-12">
        {newsPosts.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(post => {
          const image = placeholderImages.find(p => p.id === post.imageId);
          return (
            <Card key={post.slug} className="overflow-hidden">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div>
                            <p className="font-semibold">Aptly Dressed</p>
                            <p className="text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                    </div>
                </CardHeader>
                {image && (
                    <Link href={`/news-and-events/${post.slug}`} className="block group">
                        <div className="relative aspect-video bg-muted">
                            <Image
                                src={image.imageUrl}
                                alt={post.title}
                                fill
                                className="object-cover"
                                data-ai-hint={image.imageHint}
                            />
                        </div>
                    </Link>
                )}
              <CardContent className="pt-6">
                <CardTitle className="font-headline text-2xl mb-4">
                  <Link href={`/news-and-events/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </CardTitle>
                <div
                    className="prose prose-sm max-w-none text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                 <Button asChild variant="link" className="p-0 h-auto -mt-4">
                  <Link href={`/news-and-events/${post.slug}`}>
                    View Post & Comments
                  </Link>
                </Button>
                <NewsPostShareButtons post={post} />
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
