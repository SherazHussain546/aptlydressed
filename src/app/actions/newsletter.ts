'use server';

import { z } from 'zod';
import { firestore } from '@/lib/firebase-admin';

const emailSchema = z.string().email({ message: "Please enter a valid email address." });

export async function subscribeToNewsletter(prevState: any, formData: FormData) {
  const email = formData.get('email');
  
  const validatedEmail = emailSchema.safeParse(email);

  if (!validatedEmail.success) {
    return {
      message: validatedEmail.error.errors[0].message,
    };
  }

  try {
    const newsletterRef = firestore.collection('newsletter');
    
    // Check if email already exists
    const snapshot = await newsletterRef.where('email', '==', validatedEmail.data).limit(1).get();
    if (!snapshot.empty) {
      return { message: 'This email is already subscribed.' };
    }

    // Add new email
    await newsletterRef.add({
      email: validatedEmail.data,
      subscribedAt: new Date(),
    });

    return { message: 'Thank you for subscribing!' };

  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return { message: 'An unexpected error occurred. Please try again later.' };
  }
}
