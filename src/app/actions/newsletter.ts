
'use server';

import { z } from 'zod';
import { firestore } from '@/lib/firebase-admin';

const emailSchema = z.string().email({ message: "Please enter a valid email address." });

// This is what needs to be passed to useActionState
export async function subscribeToNewsletter(prevState: any, formData: FormData) {
  const validatedEmail = emailSchema.safeParse(formData.get('email'));

  if (!validatedEmail.success) {
    return {
      message: validatedEmail.error.errors[0].message,
    };
  }
  
  const email = validatedEmail.data;

  try {
    const newsletterRef = firestore.collection('notifyme');
    
    // Check if email already exists
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
