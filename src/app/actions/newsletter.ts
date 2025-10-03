
'use server';

import { z } from 'zod';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

const emailSchema = z.string().email({ message: "Please enter a valid email address." });

export async function subscribeToNewsletter(prevState: any, formData: FormData) {
  const { firestore } = initializeFirebase();
  const email = formData.get('email');
  
  const validatedEmail = emailSchema.safeParse(email);

  if (!validatedEmail.success) {
    return {
      message: validatedEmail.error.errors[0].message,
    };
  }

  try {
    const newsletterRef = collection(firestore, 'newsletter');
    
    // Check if email already exists
    const q = query(newsletterRef, where('email', '==', validatedEmail.data));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return { message: 'This email is already subscribed.' };
    }

    // Add new email
    await addDoc(newsletterRef, {
      email: validatedEmail.data,
      subscribedAt: new Date(),
    });

    return { message: 'Thank you for subscribing!' };

  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return { message: 'An unexpected error occurred. Please try again later.' };
  }
}
