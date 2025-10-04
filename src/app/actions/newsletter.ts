
'use server';

import { z } from 'zod';

const emailSchema = z.string().email({ message: "Please enter a valid email address." });

// A list of common disposable email domains. This can be expanded.
const disposableDomains = new Set([
  'mailinator.com', 'temp-mail.org', '10minutemail.com', 'guerrillamail.com', 'getnada.com', 'yopmail.com'
]);

export type NewsletterSubscribeState = {
  message: string;
  email?: string;
  success: boolean;
}

// This server action now only validates the email and returns it.
// The client will handle the Firestore interaction.
export async function subscribeToNewsletter(prevState: NewsletterSubscribeState, formData: FormData): Promise<NewsletterSubscribeState> {
  const validatedEmail = emailSchema.safeParse(formData.get('email'));

  if (!validatedEmail.success) {
    return {
      message: validatedEmail.error.errors[0].message,
      success: false,
    };
  }
  
  const email = validatedEmail.data;
  const domain = email.split('@')[1];

  if (domain && disposableDomains.has(domain.toLowerCase())) {
    return {
      message: "Please use a permanent email address. Disposable emails are not allowed.",
      success: false,
    };
  }

  // Instead of writing to Firestore here, we return the email to the client.
  // The client-side code will then handle the Firestore 'addDoc' operation.
  return { 
    message: 'Thank you for subscribing!',
    email: email,
    success: true,
  };
}

    