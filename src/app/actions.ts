"use server";

import { getSimilarProductRecommendations } from "@/ai/flows/ai-similar-product-recommendation";

interface FormState {
  recommendations: string[] | null;
  error: string | null;
}

export async function recommendProducts(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const occasionDetails = formData.get("occasionDetails") as string;

  if (!occasionDetails || occasionDetails.trim().length === 0) {
    return { recommendations: null, error: "Please describe your occasion." };
  }

  try {
    const result = await getSimilarProductRecommendations({ occasionDetails });
    if (result.productRecommendations && result.productRecommendations.length > 0) {
      return { recommendations: result.productRecommendations, error: null };
    } else {
      return { recommendations: null, error: "We couldn't find any recommendations for this occasion. Please try being more specific." };
    }
  } catch (e) {
    console.error(e);
    return { recommendations: null, error: "An unexpected error occurred. Please try again later." };
  }
}
