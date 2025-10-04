
import type { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, Target, Users, Gem, Shield, TrendingUp, DollarSign, Lightbulb } from 'lucide-react';
import { ProposalChart } from '@/components/proposal/ProposalChart';

export const metadata: Metadata = {
  title: 'Business Proposal | APTLY DRESSED',
  description:
    'A comprehensive business proposal for APTLY DRESSED, a premier fashion affiliate e-commerce aggregator based in Dublin, Ireland. Outlining our mission, market analysis, financial projections, and growth strategy.',
  keywords:
    'fashion business proposal, e-commerce investment, affiliate marketing, APTLY DRESSED, Dublin tech startup, online fashion, startup funding, SWOT analysis fashion',
  robots: 'noindex, nofollow', // Hides the page from search engines
};

export default function ProposalPage() {
  return (
    <div className="bg-background">
      <header className="bg-muted py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-headline text-primary">
            Business Proposal: APTLY DRESSED
          </h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-muted-foreground">
            Redefining Fashion Discovery for the Modern Consumer.
          </p>
          <p className="text-sm mt-2 text-muted-foreground">
            Dublin, Ireland | CONFIDENTIAL
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* I. Executive Summary */}
          <section id="executive-summary">
            <h2 className="text-3xl font-headline border-b pb-2 mb-4">
              I. Executive Summary
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>A Curated Vision for the Future of Fashion</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none">
                <p>
                  <strong>1.1 Introduction:</strong> APTLY DRESSED is a
                  content-driven affiliate fashion e-commerce aggregator poised
                  to revolutionize how consumers discover and purchase clothing.
                  Our primary goal is to provide a seamless, curated, and
                  confidence-inspiring shopping experience.
                </p>
                <p>
                  <strong>1.2 Problem & Solution Summary:</strong> We address
                  the core problem of the fragmented, overwhelming, and
                  time-consuming online shopping experience. Consumers waste
                  hours navigating dozens of sites to assemble a single outfit.
                  APTLY DRESSED provides the definitive solution: a one-stop,
                  expertly curated platform that presents complete,
                  occasion-appropriate outfits, saving users time and
                  eliminating decision fatigue.
                </p>
                <p>
                  <strong>1.3 Financial Request:</strong> We are seeking an
                  initial seed investment to accelerate our growth. These funds
                  will be strategically allocated towards aggressive digital
                  marketing campaigns, scaling our platform development with SYNC
                  TECH, and securing premium affiliate partnerships.
                </p>
                <p>
                  <strong>1.4 Key to Success:</strong> Our success is built on
                  three pillars: superior, AI-assisted human curation that focuses on
                  whole outfits; strong, mutually beneficial affiliate
                  partnerships with leading brands; and a robust, scalable
                  technical foundation that ensures an unparalleled user
                  experience.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* II. Company Overview */}
          <section id="company-overview">
            <h2 className="text-3xl font-headline border-b pb-2 mb-4">
              II. Company Overview
            </h2>
             <div className="prose max-w-none">
                <p><strong>2.1 Legal Structure:</strong> We are structured as a Sole Proprietorship based in Dublin, Ireland, operating under the registered Fictitious Business Name (DBA) "APTLY DRESSED." This structure provides operational simplicity and agility in our early stages.</p>
                
                <p><strong>2.2 Mission and Vision:</strong></p>
                <ul>
                    <li><strong>Mission:</strong> To simplify fashion and empower consumers to dress confidently and appropriately for any occasion by providing expertly curated, complete outfit solutions.</li>
                    <li><strong>Vision:</strong> To become the world's leading and most trusted digital destination for curated outfit discovery and style inspiration.</li>
                </ul>

                <p><strong>2.3 Team & Management:</strong> Founded by the Hussain Brothers (Shaharyar Hussain and <a href="https://sherazhussain.synctech.ie" target="_blank" rel="noopener noreferrer">Sheraz Hussain</a>), our team combines a deep passion for fashion with a keen understanding of the digital landscape. Our strategic partnership with <strong><a href="https://synctech.ie" target="_blank" rel="noopener noreferrer">SYNC TECH Solutions</a></strong> provides us with best-in-class expertise in platform development, data security, and scalability, ensuring our technological infrastructure is as robust and forward-thinking as our fashion-forward vision.</p>
            </div>
          </section>

          {/* III. Products and Services */}
          <section id="products-services">
            <h2 className="text-3xl font-headline border-b pb-2 mb-4">
              III. Products and Services
            </h2>
            <div className="prose max-w-none">
                <p><strong>3.1 Core Offering:</strong> APTLY DRESSED is a high-end affiliate e-commerce platform. We do not hold inventory. Instead, we aggregate the finest apparel and accessories from top-tier global clothing brands. Our service involves presenting these items within the context of complete, shoppable outfits, and providing direct affiliate links for purchase.</p>
                <p><strong>3.2 The Customer Experience:</strong> The user journey is designed for simplicity and inspiration:</p>
                <ol>
                    <li><strong>Discover:</strong> The user arrives on APTLYDRESSED.com seeking an outfit for a specific occasion (e.g., "a summer wedding," "a business casual meeting").</li>
                    <li><strong>Explore:</strong> They browse our curated collections, style guides, or product pages, each showcasing complete, ready-to-wear looks.</li>
                    <li><strong>Select & Click:</strong> Upon finding their perfect ensemble, the user clicks our affiliate links, which seamlessly redirects them to the partner brand's website.</li>
                    <li><strong>Purchase:</strong> The transaction, payment, and fulfillment are handled directly by the trusted brand, ensuring a secure and familiar checkout process for the user.</li>
                </ol>
                <p><strong>3.3 Key Differentiator (USP):</strong> Our Unique Selling Proposition is our unwavering focus on <strong>whole-outfit curation for specific occasions.</strong> While competitors list individual products, we solve the user's core problem: "What do I wear for...?" This occasion-based, solution-oriented approach provides immense value, builds user trust, and distinguishes us in a crowded market.</p>
            </div>
          </section>

          {/* IV. Market Analysis */}
          <section id="market-analysis">
            <h2 className="text-3xl font-headline border-b pb-2 mb-4">
              IV. Market Analysis and Validation
            </h2>
            <div className="prose max-w-none">
                <p><strong>4.1 Industry Overview:</strong> The global online fashion market is a multi-billion dollar industry experiencing consistent year-over-year growth, projected to expand significantly by 2028. Within this, affiliate marketing represents a substantial and growing channel, as brands seek cost-effective, high-conversion marketing partners. APTLY DRESSED is perfectly positioned at the intersection of these two booming sectors.</p>
                
                <p><strong>4.2 Target Audience (Buyer Persona):</strong> Our primary target is the style-conscious millennial and Gen Z consumer (ages 22-40), digitally native, with a high disposable income. This demographic values convenience, authenticity, and quality. They are active on social media platforms like Instagram and Pinterest, follow fashion influencers, and are overwhelmed by the paradox of choice in online shopping. They seek a trusted, expert voice to simplify their decisions.</p>

                <p><strong>4.3 Market Needs:</strong> The market has a clear and unmet need for a solution that bridges the gap between style inspiration and convenient shopping. Consumers don't want just a product; they want a look. They need a service that saves them time, removes the cognitive load of matching individual items, and provides the confidence that their chosen outfit is appropriate and stylish. APTLY DRESSED directly serves this need.</p>
            </div>
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>4.4 SWOT Analysis</CardTitle>
                <CardDescription>A strategic overview of our position in the market.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg text-green-600 flex items-center"><TrendingUp className="mr-2 h-5 w-5"/>Strengths</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Unique Value Proposition:</strong> Focus on complete, occasion-based outfits.</li>
                            <li><strong>Lean Operational Model:</strong> No inventory, low overhead.</li>
                            <li><strong>Expert Curation:</strong> A strong editorial voice builds trust and authority.</li>
                            <li><strong>Scalable Tech Stack:</strong> Foundation built for growth by SYNC TECH.</li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg text-red-600 flex items-center"><ArrowUp className="mr-2 h-5 w-5 rotate-90"/>Weaknesses</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>New Brand:</strong> Lack of initial brand recognition.</li>
                            <li><strong>Revenue Dependence:</strong> Reliant on affiliate commissions and partner performance.</li>
                            <li><strong>Limited Control:</strong> No control over partner stock, shipping, or customer service.</li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg text-blue-600 flex items-center"><Lightbulb className="mr-2 h-5 w-5"/>Opportunities</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Growing Affiliate Market:</strong> Brands are increasing affiliate marketing budgets.</li>
                            <li><strong>Content-Commerce Trend:</strong> Rise of shoppable content and style guides.</li>
                            <li><strong>AI Integration:</strong> Leveraging AI for personalized recommendations.</li>
                            <li><strong>Expansion into New Niches:</strong> Potential to expand into menswear, accessories, or home decor.</li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg text-yellow-600 flex items-center"><Shield className="mr-2 h-5 w-5"/>Threats</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Intense Competition:</strong> Competition from large retailers and established influencers.</li>
                            <li><strong>Changing SEO Algorithms:</strong> Vulnerability to shifts in Google's search rankings.</li>
                            <li><strong>Affiliate Program Changes:</strong> Partner brands could alter commission structures or end programs.</li>
                        </ul>
                    </div>
                </div>
              </CardContent>
            </Card>
          </section>

           {/* V. Marketing & Sales */}
           <section id="marketing-sales">
            <h2 className="text-3xl font-headline border-b pb-2 mb-4">
                V. Marketing and Sales Plan
            </h2>
            <div className="prose max-w-none">
                <p><strong>5.1 Marketing Goals:</strong> Our primary goals for the first 12 months are to establish strong brand awareness within our target demographic, drive 100,000 unique monthly visitors to our website, and achieve an initial affiliate conversion rate of 3-5% on outbound clicks.</p>
                <p><strong>5.2 Digital Strategy:</strong></p>
                <ul>
                    <li><strong>SEO & Content Marketing:</strong> Our strategy is centered on creating high-value, long-form content. This includes comprehensive style guides ("What to Wear to a Winter Wedding"), trend reports, and deep-dives into sustainable fashion. We will target long-tail keywords to attract a high-intent audience, establishing APTLY DRESSED as a trusted authority in fashion.</li>
                    <li><strong>Affiliate Partner Relations:</strong> We will proactively build strong relationships with a curated list of premium and emerging fashion brands that align with our ethos of quality and sustainability. We will leverage affiliate networks like Rakuten, ShareASale, and direct partnerships.</li>
                    <li><strong>Social Media:</strong> Our primary platforms will be Instagram and Pinterest, which are ideal for visual discovery. Content will focus on beautifully styled outfit flat lays, "Get the Look" video clips, and user-generated content campaigns to build an engaged community.</li>
                </ul>
                <p><strong>5.3 Sales Strategy:</strong> Our revenue model is based purely on affiliate commissions. We will earn a percentage of the total sale value for every purchase made by a user who clicks through from our site. Commission rates typically range from 5% to 15%, depending on the brand and product category. Our sales strategy is to maximize qualified traffic and optimize the user journey to ensure the highest possible click-through rate to our partners.</p>
            </div>
           </section>

            {/* VI. Operational Plan */}
            <section id="operational-plan">
                <h2 className="text-3xl font-headline border-b pb-2 mb-4">VI. Operational Plan</h2>
                <div className="prose max-w-none">
                    <p><strong>6.1 Location & Facility:</strong> APTLY DRESSED operates as a fully remote, cloud-based business headquartered in Dublin, Ireland. This virtual model provides significant cost savings and operational flexibility, eliminating the need for physical office space or warehousing.</p>
                    <p><strong>6.2 Technology & Tools:</strong> Our operation relies on a modern, scalable tech stack:</p>
                    <ul>
                        <li><strong>Website Platform:</strong> Next.js on Vercel for optimal performance and SEO.</li>
                        <li><strong>Content Management:</strong> A headless CMS for agile content updates.</li>
                        <li><strong>Affiliate Management:</strong> Tools like Affjet or Trackonomics to manage and track affiliate link performance.</li>
                        <li><strong>Analytics:</strong> Google Analytics and Hotjar to monitor user behavior and optimize conversion funnels.</li>
                    </ul>
                    <p><strong>6.3 Fulfillment & Logistics:</strong> A key strength of our business model is its operational simplicity. All aspects of the transaction post-click—including inventory management, payment processing, shipping, and customer service—are handled directly by our partner brands. This absolves APTLY DRESSED of the complexities and costs of logistics, allowing us to focus entirely on curation and marketing.</p>
                </div>
            </section>

          {/* VII. Financial Plan */}
          <section id="financial-plan">
            <h2 className="text-3xl font-headline border-b pb-2 mb-4">
              VII. Financial Plan
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>7.1 Startup Costs</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Estimated Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Platform Development</TableCell>
                      <TableCell>Initial build and customization with <a href="https://synctech.ie" target="_blank" rel="noopener noreferrer">SYNC TECH</a></TableCell>
                      <TableCell className="text-right">€15,000</TableCell>
                    </TableRow>
                     <TableRow>
                      <TableCell>Legal & Filing</TableCell>
                      <TableCell>DBA registration, legal consultation</TableCell>
                      <TableCell className="text-right">€1,500</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Initial Marketing Campaign</TableCell>
                      <TableCell>6-month budget for SEO, content creation, and social media ads</TableCell>
                      <TableCell className="text-right">€10,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Software Subscriptions</TableCell>
                      <TableCell>1-year cost for affiliate tools, analytics, and hosting</TableCell>
                      <TableCell className="text-right">€2,500</TableCell>
                    </TableRow>
                     <TableRow className="font-bold">
                      <TableCell>Total Startup Costs</TableCell>
                      <TableCell></TableCell>
                      <TableCell className="text-right">€29,000</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>7.2 Financial Projections (3-Year Forecast)</CardTitle>
                <CardDescription>Illustrative revenue and growth projections based on market data and planned marketing execution.</CardDescription>
              </CardHeader>
              <CardContent>
                <ProposalChart />
              </CardContent>
            </Card>

             <div className="prose max-w-none mt-8">
                <p><strong>7.3 Funding Request & Use of Funds:</strong> We are seeking <strong>€50,000</strong> in seed funding. This capital will be allocated as follows:</p>
                <ul>
                    <li><strong>€29,000:</strong> To cover all initial startup costs.</li>
                    <li><strong>€21,000:</strong> To provide 6 months of operational runway, covering founder salaries and ongoing marketing efforts to achieve critical mass before reaching profitability.</li>
                </ul>
                <p><strong>7.4 Exit Strategy:</strong> Our primary exit strategy is acquisition. Within a 5-7 year timeframe, we aim to position APTLY DRESSED as an attractive acquisition target for a larger digital media group, a major fashion retailer looking to enhance its content-commerce arm, or a private equity firm specializing in high-growth digital assets.</p>
             </div>
          </section>

          {/* VIII. Appendix */}
          <section id="appendix">
            <h2 className="text-3xl font-headline border-b pb-2 mb-4">
              VIII. Appendix (Supporting Documents)
            </h2>
            <div className="prose max-w-none">
                <p>Supporting documentation is available upon request, including:</p>
                <ul>
                    <li><strong>8.1 Market Research Data:</strong> Detailed reports on market size, growth trends, and consumer behavior from sources such as Statista, Google Trends, and industry-specific market analyses.</li>
                    <li><strong>8.2 Legal and Regulatory Documents:</strong> Proof of DBA filing and other relevant business registration documents.</li>
                    <li><strong>8.3 Resumes/CVs:</strong> Detailed professional backgrounds of the founding team, the Hussain Brothers (Shaharyar Hussain and <a href="https://sherazhussain.synctech.ie" target="_blank" rel="noopener noreferrer">Sheraz Hussain</a>).</li>
                </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
