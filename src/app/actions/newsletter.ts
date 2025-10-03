
'use server';

import { z } from 'zod';

const emailSchema = z.string().email({ message: "Please enter a valid email address." });

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

  // Instead of writing to Firestore here, we return the email to the client.
  // The client-side code will then handle the Firestore 'addDoc' operation.
  return { 
    message: 'Thank you for subscribing!',
    email: email,
    success: true,
  };
}
