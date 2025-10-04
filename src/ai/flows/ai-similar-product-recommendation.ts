// 'use server';

/**
 * @fileOverview AI-powered product recommendation flow that suggests similar products based on user's occasion details.
 *
 * - getSimilarProductRecommendations - A function that handles the product recommendation process.
 * - SimilarProductRecommendationInput - The input type for the getSimilarProductRecommendations function.
 * - SimilarProductRecommendationOutput - The return type for the getSimilarProductRecommendations function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimilarProductRecommendationInputSchema = z.object({
  occasionDetails: z
    .string()
    .describe(
      'Details about the occasion for which the user wants product recommendations.'
    ),
});
export type SimilarProductRecommendationInput = z.infer<
  typeof SimilarProductRecommendationInputSchema
>;

const SimilarProductRecommendationOutputSchema = z.object({
  productRecommendations: z
    .array(z.string())
    .describe(
      'An array of product names that are recommended based on the occasion details.'
    ),
});
export type SimilarProductRecommendationOutput = z.infer<
  typeof SimilarProductRecommendationOutputSchema
>;

export async function getSimilarProductRecommendations(
  input: SimilarProductRecommendationInput
): Promise<SimilarProductRecommendationOutput> {
  return similarProductRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'similarProductRecommendationPrompt',
  input: {schema: SimilarProductRecommendationInputSchema},
  output: {schema: SimilarProductRecommendationOutputSchema},
  prompt: `You are a personal stylist for "APTLY DRESSED", a fashion affiliate marketing website. You recommend products that are sold on partner websites.

  APTLY DRESSED targets style-conscious millennials (ages 25-40) who value quality, modern design, and sustainable fashion.
  The brand aesthetic is clean, minimalist, and elegant, with a high-end but accessible feel.
  The color palette uses neutral tones (beige, soft grey, off-white) with deep burgundy for buttons and key highlights.
  Typography includes a modern sans-serif font (like Inter or Lato) for body text and a stylish serif font (like Playfair Display or Garamond) for headlines.

  Based on the occasion details provided by the user, recommend 1-2 similar products from APTLY DRESSED that would be suitable.
  Return only the names of the products. Do not explain your reasoning.

  Occasion Details: {{{occasionDetails}}}`,
});

const similarProductRecommendationFlow = ai.defineFlow(
  {
    name: 'similarProductRecommendationFlow',
    inputSchema: SimilarProductRecommendationInputSchema,
    outputSchema: SimilarProductRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
