
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FAQ & Customer Support | APTLY DRESSED',
    description: "Find answers to frequently asked questions about orders, returns, shipping, payments, and account management. Your guide to a seamless shopping experience with APTLY DRESSED.",
    keywords: ['faq', 'customer support', 'returns policy', 'shipping information', 'payment options', 'account help', 'order tracking']
};

const faqData = [
  {
    category: "Ordering",
    questions: [
      {
        question: "How do I place an order?",
        answer: "Placing an order is simple. Browse our collections, select your desired product, choose your size and color, and click 'Buy Now'. You will be redirected to our trusted brand partner's website to complete your purchase securely. Since we are an affiliate platform, the final transaction is handled by the brand, ensuring a secure and familiar checkout process."
      },
      {
        question: "Has my order gone through?",
        answer: "Once your purchase is complete on our partner's website, you will receive an order confirmation email directly from them. This email will contain all the details of your order, including the order number and receipt. If you don't receive it, please check your spam folder before contacting the brand's customer service."
      },
      {
        question: "Can I change or cancel my order?",
        answer: "Because your transaction is completed with our partner brands, any changes or cancellations must be handled directly through their customer service channels. Please refer to the confirmation email you received from the brand for details on their specific policies and how to contact them for assistance."
      }
    ]
  },
  {
    category: "Delivery",
    questions: [
      {
        question: "How can I track my order?",
        answer: "Once your order is dispatched, our partner brand will send you a shipping confirmation email containing a tracking number and a link to the courier's website. You can use this link to monitor your delivery's progress."
      },
      {
        question: "What are the delivery options?",
        answer: "Delivery options, including standard, express, and international shipping, are determined by our partner brands. You will be able to see all available options and their costs during the checkout process on their website."
      },
      {
        question: "Where do you deliver to?",
        answer: "Our brand partners offer a wide range of shipping destinations, many with worldwide delivery. Please check the specific brand's shipping policy on their website for detailed information on the countries they serve."
      }
    ]
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        question: "How do I return an item?",
        answer: "All returns are handled directly by the brand from which you purchased the item. Please visit the brand's website and follow their returns process, which is typically outlined in their 'Returns' or 'FAQ' section. You will usually need your order number to initiate a return."
      },
      {
        question: "What is your returns policy?",
        answer: "As we are a fashion affiliate curator, the returns policy for each item is determined by the partner brand. Most brands offer a 14 to 30-day return window for unworn items with tags attached, but we strongly recommend reviewing the specific policy on their website."
      },
      {
        question: "I received a faulty or incorrect item. What should I do?",
        answer: "We are sorry to hear this. Please contact the customer service team of the brand you purchased from immediately. They will be able to arrange for a replacement or refund for you. Their contact details can be found on their website or in your order confirmation email."
      }
    ]
  },
  {
    category: "Payments",
    questions: [
      {
        question: "What payment methods are accepted?",
        answer: "Our partner brands accept a variety of payment methods, including all major credit cards (Visa, MasterCard, American Express), PayPal, and often other services like Apple Pay or Google Pay. All payment options will be visible at checkout on their site."
      },
      {
        question: "Is my payment information secure?",
        answer: "Absolutely. Your payment is processed on our partner brand's secure checkout page, which uses industry-standard SSL encryption to protect your data. We never see or store your payment information."
      }
    ]
  },
  {
    category: "Product & Stock",
    questions: [
      {
        question: "How do I know what size to buy?",
        answer: "Each product page on our partner brands' websites includes a detailed size guide. We recommend measuring yourself and comparing it to their chart to find the perfect fit. If you are between sizes, check the product description for fit recommendations (e.g., 'runs large' or 'true to size')."
      },
      {
        question: "An item is out of stock. Will it come back?",
        answer: "Stock levels are managed by our partner brands. Many popular items are restocked regularly. We recommend visiting the product page on the brand's site and signing up for their back-in-stock notifications if they offer that feature."
      }
    ]
  },
  {
    category: "My Account",
    questions: [
      {
        question: "Do I need an account to shop?",
        answer: "You do not need an account with APTLY DRESSED to browse and be redirected to our partners. However, you will likely need to create an account or check out as a guest on our partner brand's website to complete your purchase. Creating an account with us allows you to view your order history with our partners."
      },
      {
        question: "How do I manage my APTLY DRESSED account?",
        answer: "You can manage your account by clicking the 'Account' icon in the navigation bar. From there, you can view your order history and update your personal details."
      }
    ]
  }
];


export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg text-muted-foreground">Find answers to your questions about shopping with APTLY DRESSED.</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqData.map((categoryItem) => (
            <AccordionItem key={categoryItem.category} value={categoryItem.category}>
              <AccordionTrigger className="text-2xl font-headline hover:no-underline py-6">
                {categoryItem.category}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6">
                  {categoryItem.questions.map((item) => (
                     <div key={item.question}>
                          <h4 className="font-semibold text-lg">{item.question}</h4>
                          <p className="text-muted-foreground mt-2">{item.answer}</p>
                      </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
