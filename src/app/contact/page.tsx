
import Image from 'next/image';
import type { Metadata } from 'next';
import { Mail, Phone, MapPin } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ContactForm } from '@/components/contact/ContactForm';

const contactHeroImage = PlaceHolderImages.find(p => p.id === 'contact-hero');

export const metadata: Metadata = {
    title: 'Contact Us | Aptly Dressed',
    description: "Get in touch with Aptly Dressed for style advice, partnership inquiries, or any questions. We're here to help you on your fashion journey.",
    keywords: ['contact aptly dressed', 'fashion support', 'style advice', 'partnership inquiries', 'customer service'],
};


export default function ContactPage() {
  return (
    <div>
      <header className="relative h-[40vh] md:h-[50vh] w-full">
        {contactHeroImage && (
          <Image
            src={contactHeroImage.imageUrl}
            alt={contactHeroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={contactHeroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-headline max-w-4xl">Get in Touch</h1>
          <p className="mt-4 text-lg max-w-2xl">We'd love to hear from you. Whether you have a question, a suggestion, or a partnership proposal, we're here to help.</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
                 <h2 className="text-3xl font-headline mb-4">Contact Information</h2>
                 <p className="text-muted-foreground mb-8">
                    Feel free to reach out to us through any of the following channels. We strive to respond to all inquiries within 24-48 hours.
                 </p>
                 <div className="space-y-6">
                     <div className="flex items-center gap-4">
                        <Mail className="h-6 w-6 text-primary" />
                        <div>
                            <h3 className="font-semibold text-lg">Email</h3>
                            <a href="mailto:contact@aptlydressed.com" className="text-muted-foreground hover:text-primary">contact@aptlydressed.com</a>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <Phone className="h-6 w-6 text-primary" />
                        <div>
                            <h3 className="font-semibold text-lg">Phone</h3>
                            <p className="text-muted-foreground">(555) 123-4567 (Customer Support)</p>
                        </div>
                     </div>
                      <div className="flex items-center gap-4">
                        <MapPin className="h-6 w-6 text-primary" />
                        <div>
                            <h3 className="font-semibold text-lg">Based In</h3>
                            <p className="text-muted-foreground">Dublin, Ireland</p>
                        </div>
                     </div>
                 </div>
            </div>
            <div>
                <ContactForm />
            </div>
        </div>
      </div>
    </div>
  );
}
