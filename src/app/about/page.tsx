
import Image from 'next/image';
import { placeholderImages } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Check, Sparkles, Handshake, Linkedin } from 'lucide-react';

const aboutHeroImage = placeholderImages.find(p => p.id === 'about-hero');
const whyImage = placeholderImages.find(p => p.id === 'about-why');
const solutionImage = placeholderImages.find(p => p.id === 'about-hero');


export default function AboutPage() {
  return (
    <div>
      <header className="relative h-[40vh] md:h-[50vh] w-full">
        {aboutHeroImage && (
          <Image
            src={aboutHeroImage.imageUrl}
            alt={aboutHeroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={aboutHeroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-headline max-w-4xl">Your Best Style, Expertly Curated.</h1>
          <p className="mt-4 text-lg max-w-2xl">We believe in the power of a well-curated wardrobe to simplify life and elevate the everyday.</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 md:py-24 space-y-20">

        {/* Our "Why" Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="prose lg:prose-lg max-w-none prose-h2:font-headline">
                <h2 className="text-3xl">Our "Why": Ending the Click-and-Search Maze</h2>
                <p>
                Tired of the endless click-and-search maze? We know the frustration. You need a great outfit for a specific occasion—a party, a meeting, or just stylish daily wear—and end up bouncing between dozens of e-commerce sites. You find a jacket on one, a top on another, and the right shoes somewhere else entirely. It's exhausting.
                </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
                {whyImage && (
                    <Image
                        src={whyImage.imageUrl}
                        alt={whyImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={whyImage.imageHint}
                    />
                )}
            </div>
        </section>

        {/* Our Solution Section */}
        <section className="bg-muted -mx-4 px-4 py-16 md:-mx-8 md:px-8 md:py-24 rounded-lg">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="relative h-96 rounded-lg overflow-hidden order-last md:order-first">
                    {solutionImage && (
                        <Image
                            src={solutionImage.imageUrl}
                            alt={solutionImage.description}
                            fill
                            className="object-cover"
                            data-ai-hint={solutionImage.imageHint}
                        />
                    )}
                </div>
                 <div className="prose lg:prose-lg max-w-none prose-h2:font-headline">
                    <h2 className="text-3xl">Our Solution: Your Style, Seamlessly Delivered</h2>
                    <p>
                    <strong>APTLY DRESSED</strong> was created to be the antidote. We are your dedicated fashion affiliate platform, born from the simple idea that style should be seamless. Our mission is to aggregate the best, trendiest pieces from all the top <strong>clothing brands</strong> and bring them to you in one place.
                    </p>
                </div>
            </div>
        </section>

        {/* Our Value Section */}
        <section className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-headline mb-4">Our Value: Simplifying Fashion for You</h2>
            <p className="text-lg text-muted-foreground mb-12">
            Our goal is to help you easily make up your mind and find the perfect outfit for any event. We focus on curating whole-outfit experiences, giving you the confidence to define your best personality every day.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mb-4">
                        <Sparkles className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-headline mb-2">Curated Experiences</h3>
                    <p className="text-muted-foreground">We curate whole outfits, not just single items, to make styling effortless.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mb-4">
                        <Check className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-headline mb-2">Confident Choices</h3>
                     <p className="text-muted-foreground">Find the most appropriate dressing for any occasion with ease.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mb-4">
                        <Lightbulb className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-headline mb-2">Define Your Personality</h3>
                    <p className="text-muted-foreground">Gain the confidence to express your unique style every day.</p>
                </div>
            </div>
        </section>

        {/* How We Work Section */}
         <section className="bg-card border rounded-lg p-8 lg:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-1">
                     <div className="flex items-center gap-4">
                        <Handshake className="h-10 w-10 text-primary" />
                        <h2 className="text-3xl font-headline">How We Work</h2>
                    </div>
                </div>
                <div className="md:col-span-2 prose max-w-none text-muted-foreground">
                    <p>
                    <strong>Style Suggestions, Direct Links.</strong> As an affiliate site, we do the heavy lifting of curation and trend-spotting. When you find your perfect ensemble, we provide the link. Your purchase, stock management, and service are handled directly by the trusted brand. We save you time; the brands handle the rest.
                    </p>
                </div>
            </div>
        </section>

        {/* Meet the Founders Section */}
        <section>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-headline mb-4">Meet the Founders</h2>
            <p className="text-lg text-muted-foreground mb-12">
              APTLY DRESSED was founded by the Hussain Brothers, Shaharyar and Sheraz, who combined their passion for technology and timeless fashion to create a platform that redefines style discovery.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="text-center">
                  <CardContent className="pt-6">
                      <h3 className="text-xl font-headline">Shaharyar Hussain</h3>
                      <p className="text-primary">Co-Founder & Creative Director</p>
                      <p className="text-muted-foreground mt-2">With a keen eye for aesthetics and a deep understanding of fashion trends, Shaharyar leads the creative vision and curation for APTLY DRESSED.</p>
                      <div className="mt-4">
                        <a href="https://www.linkedin.com/in/shaharyar-hussain-480207204/" target="_blank" rel="noopener noreferrer" className="inline-block text-muted-foreground hover:text-primary">
                          <Linkedin className="h-6 w-6" />
                          <span className="sr-only">LinkedIn</span>
                        </a>
                      </div>
                  </CardContent>
              </Card>
               <Card className="text-center">
                  <CardContent className="pt-6">
                      <h3 className="text-xl font-headline">Sheraz Hussain</h3>
                      <p className="text-primary">Co-Founder & Technology Lead</p>
                      <p className="text-muted-foreground mt-2">Sheraz drives the technical strategy, ensuring the platform is fast, secure, and seamless. He leverages technology to make fashion discovery an effortless experience.</p>
                      <div className="mt-4">
                        <a href="https://www.linkedin.com/in/sherazhussain546/" target="_blank" rel="noopener noreferrer" className="inline-block text-muted-foreground hover:text-primary">
                          <Linkedin className="h-6 w-6" />
                          <span className="sr-only">LinkedIn</span>
                        </a>
                      </div>
                  </CardContent>
              </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-3xl font-headline">Ready to Transform Your Style?</h2>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/shop">Stop searching. Start styling.</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
