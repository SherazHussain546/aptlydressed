"use client";

import { useCart } from "@/contexts/CartProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CreditCard, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckoutPage() {
  const { cartItems, totalPrice, cartCount, clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (cartCount === 0) {
      router.push('/shop');
    }
  }, [cartCount, router]);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your order! (This is a demo)");
    clearCart();
    router.push('/');
  }

  if (cartCount === 0) {
    return null; // or a loading spinner
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <h1 className="text-4xl font-headline text-center mb-8">Checkout</h1>
      <form onSubmit={handlePlaceOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Shipping & Payment */}
          <div>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" required />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" required />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" required />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Anytown" required />
                </div>
                <div>
                  <Label htmlFor="state">State / Province</Label>
                  <Input id="state" placeholder="CA" required />
                </div>
                <div>
                  <Label htmlFor="zip">ZIP / Postal Code</Label>
                  <Input id="zip" placeholder="12345" required />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" placeholder="United States" required />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><CreditCard className="mr-2 h-5 w-5"/>Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div>
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="**** **** **** 1234" required />
                </div>
                <div>
                  <Label htmlFor="card-name">Name on Card</Label>
                  <Input id="card-name" placeholder="John Doe" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry-date">Expiration Date</Label>
                    <Input id="expiry-date" placeholder="MM / YY" required />
                  </div>
                  <div>
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" required />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-max">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map(item => {
                    const image = PlaceHolderImages.find(p => p.id === item.product.imageIds[0]);
                    return (
                      <div key={item.product.id} className="flex items-center gap-4">
                        <div className="relative w-16 h-20 bg-muted rounded-md overflow-hidden">
                          {image && <Image src={image.imageUrl} alt={item.product.name} fill className="object-cover" />}
                          <span className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground text-xs rounded-full">{item.quantity}</span>
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">{item.size} / {item.color}</p>
                        </div>
                        <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    );
                  })}
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-muted-foreground">Subtotal</p>
                    <p>${totalPrice.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-muted-foreground">Shipping</p>
                    <p>Free</p>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <p>Total</p>
                    <p>${totalPrice.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Button type="submit" size="lg" className="w-full mt-6">
              <Lock className="mr-2 h-4 w-4" />
              Place Order
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
