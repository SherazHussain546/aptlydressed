
'use server';

/**
 * @fileOverview AI-powered outfit recommendation flow that suggests products to complete a look.
 *
 * - getOutfitRecommendations - A function that handles the outfit recommendation process.
 * - OutfitRecommendationInput - The input type for the getOutfitRecommendations function.
 * - OutfitRecommendationOutput - The return type for the getOutfitRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OutfitRecommendationInputSchema = z.object({
  productName: z.string().describe('The name of the main product.'),
  productDescription: z.string().describe('The description of the main product.'),
  allProductNames: z
    .array(z.string())
    .describe('A list of all available product names to choose from.'),
});
export type OutfitRecommendationInput = z.infer<typeof OutfitRecommendationInputSchema>;

const OutfitRecommendationOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe(
      'An array of 1-2 product names from the provided list that would complete the outfit.'
    ),
});
export type OutfitRecommendationOutput = z.infer<
  typeof OutfitRecommendationOutputSchema
>;

export async function getOutfitRecommendations(
  input: OutfitRecommendationInput
): Promise<OutfitRecommendationOutput> {
  return outfitRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'outfitRecommendationPrompt',
  input: {schema: OutfitRecommendationInputSchema},
  output: {schema: OutfitRecommendationOutputSchema},
  prompt: `You are a personal stylist for "Aptly Dressed", a fashion affiliate marketing website.

You are given a main product and a list of all available products. Your task is to recommend 1 or 2 items from the list that would go well with the main product to "complete the look".

Do not recommend the main product itself. Only select products from the provided list. Return only the names of the recommended products.

Main Product Name: {{{productName}}}
Main Product Description: {{{productDescription}}}

Available Products:
{{#each allProductNames}}
- {{{this}}}
{{/each}}
`,
});

const outfitRecommendationFlow = ai.defineFlow(
  {
    name: 'outfitRecommendationFlow',
    inputSchema: OutfitRecommendationInputSchema,
    outputSchema: OutfitRecommendationOutputSchema,
  },
  async input => {
    // Filter out the current product from the list of names to choose from
    const availableProductNames = input.allProductNames.filter(
      name => name !== input.productName
    );

    const {output} = await prompt({
      ...input,
      allProductNames: availableProductNames,
    });
    return output!;
  }
);
