"use client"

import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { Sparkles } from 'lucide-react';

import { recommendProducts } from "@/app/actions";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { products } from "@/lib/data";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? "Getting Recommendations..." : <> <Sparkles className="mr-2 h-4 w-4" /> Get Recommendations </>}
    </Button>
  );
}

export function StyleAdvisor() {
  const [state, formAction] = useFormState(recommendProducts, null);

  return (
    <Card className="max-w-3xl mx-auto shadow-lg border-2 border-primary/20">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-3xl">AI Personal Stylist</CardTitle>
        <CardDescription>Tell us about your occasion, and we'll suggest the perfect outfit.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <Textarea
            name="occasionDetails"
            placeholder="e.g., 'A summer wedding in the countryside,' 'a casual weekend brunch with friends,' or 'an important business presentation.'"
            rows={3}
            required
            className="text-base"
          />
          <div className="text-center">
            <SubmitButton />
          </div>
        </form>

        {state?.error && (
            <Alert variant="destructive" className="mt-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
            </Alert>
        )}

        {state?.recommendations && (
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2 text-center">Our Recommendations For You:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {state.recommendations.map((rec, index) => {
                const product = products.find(p => p.name === rec);
                if (!product) {
                    return (
                        <Alert key={index}>
                            <AlertTitle>{rec}</AlertTitle>
                            <AlertDescription>Product details not found.</AlertDescription>
                        </Alert>
                    );
                }
                return (
                    <Link href={`/products/${product.slug}`} key={product.id} className="block group">
                        <Card className="h-full transition-all duration-300 hover:shadow-md hover:border-primary">
                            <CardHeader>
                                <CardTitle className="text-lg group-hover:text-primary transition-colors">{product.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
