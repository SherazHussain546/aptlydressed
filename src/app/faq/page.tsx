
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FAQ | APTLY DRESSED',
    description: "Find answers to frequently asked questions about orders, returns, payments, delivery, and more at APTLY DRESSED.",
};

const faqData = [
  {
    category: "Returns/Refunds",
    questions: [
      "How do I return?",
      "Return Costs and Refunds",
      "Faulty, Damaged or Incorrect Item received",
    ]
  },
  {
    category: "Delivery",
    questions: [
      "How can I track my order?",
      "Delivery Options",
      "Delivery Information",
    ]
  },
  {
    category: "Payments",
    questions: [
      "Ways to pay",
      "What if my payment is not accepted?",
      "Giftcard/eVouchers",
    ]
  },
  {
    category: "Store Information",
    questions: [
      "Where is my nearest store?",
      "Personal shopping & alteration service",
      "Do you offer Gift Receipts in Store?",
    ]
  },
  {
    category: "My Account",
    questions: [
      "Sign into 'My Account'",
      "Changing personal details",
      "Guest Accounts",
    ]
  },
  {
    category: "Ordering",
    questions: [
      "How do I place an order?",
      "Has my order gone through?",
      "Can I change or cancel my order?",
    ]
  },
  {
    category: "Product Information",
    questions: [
      "What size should I buy?",
      "Do you have a petite range?",
      "Where are your garments made?",
    ]
  },
  {
    category: "Website & Technical",
    questions: [
      "Do you offer a live chat service?",
      "How do I stop receiving your emails?",
      "Why can I not order my size online?",
    ]
  },
  {
    category: "Other",
    questions: [
      "An update on your order history",
      "Can I get a VAT receipt?",
      "How do I reserve an exchange",
      "Do you offer a gift wrap service",
    ]
  }
];


export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg text-muted-foreground">Find answers to your questions below.</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqData.map((categoryItem) => (
            <AccordionItem key={categoryItem.category} value={categoryItem.category}>
              <AccordionTrigger className="text-xl font-headline hover:no-underline">
                {categoryItem.category}
              </AccordionTrigger>
              <AccordionContent>
                <div className="prose max-w-none text-muted-foreground">
                  <ul>
                    {categoryItem.questions.map((question) => (
                       <li key={question}>
                            <p className="font-semibold">{question}</p>
                            <p>We are currently updating our FAQ section. Please check back later for a detailed answer or contact our customer support for immediate assistance.</p>
                        </li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
