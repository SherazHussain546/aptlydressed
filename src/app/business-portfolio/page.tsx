
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { placeholderImages } from '@/lib/data';
import {
  Users,
  Target,
  Lightbulb,
  BarChart,
  GitBranch,
  Rocket,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  LayoutGrid,
} from 'lucide-react';
import { ProposalChart } from '@/components/proposal/ProposalChart';
import { Logo } from '@/components/icons/Logo';

const portfolioHeroImage = placeholderImages.find(
  (p) => p.id === 'portfolio-hero'
);

export const metadata: Metadata = {
  title: 'Business Portfolio | APTLY DRESSED',
  description:
    'Explore the brand, vision, and market opportunity of APTLY DRESSED, a premier fashion affiliate aggregator. Discover our mission to redefine style discovery and our potential for growth. Based in Dublin, Ireland.',
  keywords: [
    'fashion business portfolio',
    'e-commerce brand',
    'affiliate marketing',
    'APTLY DRESSED',
    'Dublin fashion tech',
    'online fashion aggregator',
    'brand partnerships',
    'fashion startup',
  ],
};

function TimeSavedChart() {
  return (
    <div className="w-full max-w-lg mx-auto">
        <div className="flex justify-around items-end gap-4">
            <div className="flex flex-col items-center">
                <div className="bg-muted rounded-t-lg p-4 text-center w-32" style={{ height: '200px' }}>
                    <p className="text-sm font-bold">Traditional Shopping</p>
                    <p className="text-xs text-muted-foreground">Multiple Sites</p>
                    <Clock className="h-10 w-10 mx-auto text-destructive mt-4"/>
                    <p className="text-lg font-bold mt-2">Hours Wasted</p>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="bg-primary/20 rounded-t-lg p-4 text-center w-32" style={{ height: '100px' }}>
                    <p className="text-sm font-bold">APTLY DRESSED</p>
                     <p className="text-xs text-muted-foreground">One Platform</p>
                     <CheckCircle className="h-10 w-10 mx-auto text-primary mt-2"/>
                </div>
            </div>
        </div>
        <div className="w-full h-2 bg-border rounded-full mt-2"></div>
    </div>
  )
}


export default function BusinessPortfolioPage() {
  return (
    <div>
      {/* I. Brand Identity & Overview */}
      <header className="relative h-[60vh] md:h-[70vh] w-full">
        {portfolioHeroImage && (
          <Image
            src={portfolioHeroImage.imageUrl}
            alt={portfolioHeroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={portfolioHeroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative h-full flex flex-col items-start justify-end text-white p-8 md:p-12">
            <h1 className="text-4xl md:text-6xl font-headline max-w-3xl">
              Stop Searching. Start Styling.
            </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 md:py-24 space-y-20">

        <section id="brand-identity" className="max-w-4xl mx-auto">
             <div className="text-center mb-12">
                 <Logo />
                <h2 className="text-3xl font-headline mt-4">I. Brand Identity & Overview</h2>
            </div>
            <div className="prose prose-lg max-w-none space-y-4">
              <p>
                <strong>1.2 Executive Summary / Mission Statement:</strong>{' '}
                APTLY DRESSED is the premier fashion affiliate aggregator, created
                to solve the fragmented and overwhelming online shopping
                experience. Our mission is to simplify fashion discovery,
                empowering consumers to dress confidently and appropriately for
                any occasion by providing expertly curated, complete outfit
                solutions.
              </p>
              <p>
                <strong>1.3 The "Why" (Vision):</strong> We are driven by a passion
                to revolutionize outfit discovery. We believe that finding the
                perfect look should be an inspiring and seamless experience, not a
                chore. Our vision is to become the world's most trusted
                destination for curated style, helping people build wardrobes
                that are both beautiful and intentional.
              </p>
            </div>
        </section>


        {/* II. The Market & Opportunity */}
        <section id="market-opportunity" className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-headline mb-8">
            II. The Market & Opportunity
          </h2>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">
                2.1 The Problem: The Fragmented Fashion Maze
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-8">
                Consumers waste countless hours browsing dozens of websites to piece together a single outfit. This fragmented experience leads to decision fatigue and frustration.
              </p>
              <TimeSavedChart />
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <Card>
              <CardHeader className="items-center">
                <LayoutGrid className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="font-headline text-xl">
                  2.2 The Solution: APTLY DRESSED
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We provide a unique, centralized platform offering{' '}
                  <strong>complete, occasion-based outfit curation</strong>. By
                  aggregating the best products from leading brands, we save users
                  time and provide style confidence.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="items-center">
                <Target className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="font-headline text-xl">
                  2.3 Target Audience Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our focus is on style-conscious, digitally-native consumers
                  (ages 22-40) who value convenience, quality, and curation.
                  They are active online and seek trusted sources to simplify
                  their fashion choices.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* III. Business Model & Operations */}
        <section id="business-model" className="bg-muted -mx-4 px-4 py-16 md:-mx-8 md:px-8 md:py-24 rounded-lg">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-headline mb-8">
                    III. Business Model & Operations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card>
                        <CardHeader className="items-center">
                            <GitBranch className="h-8 w-8 text-primary mb-2" />
                            <CardTitle className="font-headline text-xl">
                            3.1 Core Business Model
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                            Our revenue is generated through{' '}
                            <strong>commission-based affiliate links</strong>. We earn a percentage
                            from our brand partners for every sale we facilitate, at no
                            extra cost to the customer.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="items-center">
                            <CheckCircle className="h-8 w-8 text-primary mb-2" />
                            <CardTitle className="font-headline text-xl">
                            3.2 Operational Structure
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                            Our lean,{' '}
                            <strong>zero-inventory-risk model</strong> means we focus on
                            curation and marketing. All fulfillment is handled by our
                            trusted partners. Digital security is managed by{' '}
                            <strong>SYNC TECH</strong>.
                            </p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="items-center">
                            <Users className="h-8 w-8 text-primary mb-2" />
                            <CardTitle className="font-headline text-xl">
                            3.3 Affiliate Ecosystem
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                            We act as the central hub, seamlessly connecting discerning
                            consumers with top-tier fashion brands, creating a
                            win-win-win ecosystem for all.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>


        {/* IV. Platform / Product Showcase */}
        <section id="platform-showcase">
          <h2 className="text-3xl font-headline text-center mb-8">
            IV. Platform Showcase
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="prose lg:prose-lg max-w-none">
              <h3 className="font-headline text-2xl">4.1 A Seamless Digital Experience</h3>
              <p>
                Our platform is designed to be as elegant and well-crafted as
                the fashion we feature. We prioritize a clean, intuitive, and
                visually stunning user experience that makes discovering and
                shopping for complete outfits a delight.
              </p>
               <h3 className="font-headline text-2xl mt-8">4.2 User Experience Highlights</h3>
               <ul className="text-muted-foreground">
                   <li><strong>Occasion-Based Filtering:</strong> Easily find the perfect outfit for any event.</li>
                   <li><strong>Complete the Look AI:</strong> AI-powered suggestions to complete any outfit.</li>
                   <li><strong>High-Quality Imagery:</strong> Immersive visuals to showcase every detail.</li>
                   <li><strong>Seamless Checkout:</strong> Direct links to brand partners for trusted purchasing.</li>
               </ul>
                <h3 className="font-headline text-2xl mt-8">4.3 Technology Stack</h3>
                <p>Powered by a modern stack (Next.js, Vercel, Google Cloud) built by <strong>SYNC TECH</strong> for elite performance and scalability.</p>
            </div>
            <div className="relative h-[600px] rounded-lg overflow-hidden border p-2 bg-muted">
              <Image
                src="https://images.unsplash.com/photo-1619785292559-a15caa28bde6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxmYXNoaW9uJTIwbW9kZWx8ZW58MHx8fHwxNzU5MDQ0NTU4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Screenshot of the APTLY DRESSED platform"
                fill
                className="object-cover rounded-md"
                data-ai-hint="fashion model"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <p className="absolute bottom-4 left-4 text-white font-headline text-xl">Homepage Showcase</p>
            </div>
          </div>
        </section>

        {/* V. Traction & Growth Potential */}
        <section id="growth-potential" className="bg-card border rounded-lg p-8 md:p-12">
           <h2 className="text-3xl font-headline text-center mb-8">
            V. Traction & Growth Potential
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                  <BarChart className="h-10 w-10 text-primary mx-auto mb-4"/>
                  <h3 className="font-headline text-xl">5.1 Market Validation</h3>
                  <p className="text-muted-foreground mt-2">Initial market research indicates strong consumer demand for a curated, time-saving fashion platform, with a projected 40% reduction in shopping time.</p>
              </div>
              <div>
                  <Lightbulb className="h-10 w-10 text-primary mx-auto mb-4"/>
                  <h3 className="font-headline text-xl">5.2 Competitive Advantage</h3>
                  <p className="text-muted-foreground mt-2">Our unique focus on <strong>whole-outfit curation</strong> for specific occasions sets us apart from product-listing competitors and generic search engines.</p>
              </div>
               <div>
                  <Rocket className="h-10 w-10 text-primary mx-auto mb-4"/>
                  <h3 className="font-headline text-xl">5.3 Future Milestones</h3>
                  <p className="text-muted-foreground mt-2">Our 12-month goals include securing 50+ key brand partnerships, launching a dedicated mobile app, and achieving 100,000 unique monthly visitors.</p>
              </div>
          </div>
           <div className="mt-12">
                <ProposalChart />
            </div>
        </section>

        {/* VI. The Team & Contact */}
        <section id="team-contact" className="text-center">
          <h2 className="text-3xl font-headline mb-8">VI. The Team & Contact</h2>
          <div className="max-w-4xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">6.1 Leadership: The Hussain Brothers</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Founded by Shaharyar and Sheraz Hussain, our team combines a deep
                        passion for fashion with proven expertise in digital strategy and
                        technology. In partnership with <strong>SYNC TECH</strong>, we are committed to building a
                        world-class platform grounded in excellence and integrity.
                    </p>
                </CardContent>
            </Card>
             <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="font-headline">6.2 Legal & Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-left">
                    <p><strong>Legal Entity:</strong> Sole Proprietorship, DBA "APTLY DRESSED"</p>
                    <p><strong>Location:</strong> Dublin, Ireland</p>
                    <div className="flex items-center gap-4">
                        <Mail className="h-5 w-5 text-primary" />
                        <a href="mailto:aptlydressed@outlook.com" className="hover:text-primary">aptlydressed@outlook.com</a>
                    </div>
                     <div className="flex items-center gap-4">
                        <Phone className="h-5 w-5 text-primary" />
                        <span>(353) 830 68 2026</span>
                    </div>
                    <div className="pt-4 text-center">
                        <Button asChild size="lg">
                            <Link href="/collaborate">Request a Partnership Deck</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
