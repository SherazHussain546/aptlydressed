
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'Privacy Policy | APTLY DRESSED',
    description: "Understand how APTLY DRESSED collects, uses, and protects your personal data. Your privacy is important to us.",
    robots: 'noindex, nofollow',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline">Privacy Policy</h1>
            <p className="mt-4 text-lg text-muted-foreground">Last Updated: July 29, 2024</p>
        </div>

        <div className="prose lg:prose-lg max-w-none prose-h2:font-headline">
            <p>
            Welcome to APTLY DRESSED. Your privacy is critically important to us. This Privacy Policy outlines the types of information we may collect from you or that you may provide when you visit our website and our practices for collecting, using, maintaining, protecting, and disclosing that information.
            </p>

            <h2>1. Information We Collect</h2>
            <p>We collect several types of information from and about users of our Website, including:</p>
            <ul>
                <li><strong>Personal Information:</strong> When you create an account or subscribe to our newsletter, we may ask for your name, email address, and other relevant details.</li>
                <li><strong>Usage Details and Cookies:</strong> As you navigate through the site, we may use automatic data collection technologies to collect certain information about your equipment, browsing actions, and patterns. This includes details of your visits, traffic data, and information about your computer and internet connection. The technologies we use for this automatic data collection may include cookies.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information that we collect about you or that you provide to us, including any personal information, to:</p>
            <ul>
                <li>Present our Website and its contents to you.</li>
                <li>Provide you with information, products, or services that you request from us.</li>
                <li>Fulfill any other purpose for which you provide it, such as signing up for our newsletter.</li>
                <li>Carry out our obligations and enforce our rights arising from any contracts entered into between you and us.</li>
                <li>Notify you about changes to our Website or any products or services we offer.</li>
            </ul>

            <h2>3. Use of Cookies</h2>
            <p>Our website uses "cookies" to enhance your user experience. A cookie is a small file placed on the hard drive of your computer. You may refuse to accept browser cookies by activating the appropriate setting on your browser. However, if you select this setting you may be unable to access certain parts of our Website.</p>
            <p>We use cookies for purposes such as:</p>
            <ul>
                <li><strong>Authentication:</strong> Firebase uses cookies to manage user sessions for account login.</li>
                <li><strong>Preferences:</strong> To remember your settings and preferences, such as your cookie consent choices.</li>
            </ul>


            <h2>4. Data Security</h2>
            <p>We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. The safety and security of your information also depends on you. Where we have given you (or where you have chosen) a password for access to certain parts of our Website, you are responsible for keeping this password confidential.</p>

            <h2>5. Your Data Protection Rights</h2>
            <p>Under data protection law, you have rights including:</p>
            <ul>
                <li>Your right of access - You have the right to ask us for copies of your personal information.</li>
                <li>Your right to rectification - You have the right to ask us to rectify information you think is inaccurate.</li>
                <li>Your right to erasure - You have the right to ask us to erase your personal information in certain circumstances.</li>
            </ul>
             <p>To exercise these rights, please contact us at <a href="mailto:aptlydressed@outlook.com">aptlydressed@outlook.com</a>.</p>

            <h2>6. Changes to Our Privacy Policy</h2>
            <p>It is our policy to post any changes we make to our privacy policy on this page. If we make material changes to how we treat our users' personal information, we will notify you through a notice on the Website home page. The date the privacy policy was last revised is identified at the top of the page.</p>

            <div className="mt-12 text-center">
                <Button asChild size="lg">
                    <Link href="/contact">Contact Us</Link>
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
