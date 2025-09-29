
'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Twitter, Facebook, Linkedin, Copy, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { NewsPost } from '@/lib/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function NewsPostShareButtons({ post, isFullPage = false }: { post: NewsPost, isFullPage?: boolean }) {
  const pathname = usePathname();
  const { toast } = useToast();
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    // For the feed page, we construct the full URL. For the post page, we use the current URL.
    const url = isFullPage ? window.location.href : `${window.location.origin}/news-and-events/${post.slug}`;
    setShareUrl(url);
  }, [pathname, post.slug, isFullPage]);

  const copyLink = () => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    toast({
        title: "Link Copied!",
        description: "The link to this post has been copied to your clipboard.",
    });
  }
  
  if (!isFullPage) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                    <span className="sr-only">Share Post</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={copyLink} disabled={!shareUrl}>
                    <Copy className="mr-2 h-4 w-4" />
                    <span>Copy link</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer">
                        <Twitter className="mr-2 h-4 w-4" />
                        <span>Share on Twitter</span>
                    </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">
                        <Facebook className="mr-2 h-4 w-4" />
                        <span>Share on Facebook</span>
                    </a>
                </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                    <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="mr-2 h-4 w-4" />
                        <span>Share on LinkedIn</span>
                    </a>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
  }

  return (
    <div className="flex items-center gap-4">
        <p className="font-semibold text-sm">Share:</p>
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
  );
}
