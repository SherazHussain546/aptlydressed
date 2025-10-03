
'use server';

import { z } from 'zod';
import { firestore } from '@/lib/firebase-admin';

const emailSchema = z.string().email({ message: "Please enter a valid email address." });

export async function subscribeToNewsletter(prevState: any, formData: FormData) {
  const validatedFields = emailSchema.safeParse(formData.get('email'));

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors[0].message,
    };
  }
  
  const email = validatedFields.data;

  try {
    const newsletterRef = firestore.collection('subscribers');
    
    const snapshot = await newsletterRef.where('email', '==', email).limit(1).get();

    if (!snapshot.empty) {
      return { message: 'This email is already subscribed.' };
    }

    await newsletterRef.add({
      email: email,
      subscribedAt: new Date(),
    });

    return { message: 'Thank you for subscribing!' };

  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return { message: 'An unexpected error occurred. Please try again later.' };
  }
}
