"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus, Minus } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartCount, totalPrice } = useCart();

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <h1 className="text-4xl font-headline text-center mb-8">Shopping Cart</h1>
      
      {cartCount > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <ul className="divide-y">
                  {cartItems.map(item => {
                    const image = PlaceHolderImages.find(p => p.id === item.product.imageIds[0]);
                    return (
                      <li key={`${item.product.id}-${item.size}-${item.color}`} className="flex items-center p-4">
                        <div className="relative w-24 h-32 bg-muted rounded-md overflow-hidden">
                          {image && (
                            <Image
                              src={image.imageUrl}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div className="ml-4 flex-grow">
                          <h3 className="font-semibold">{item.product.name}</h3>
                          <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                          <p className="text-sm text-muted-foreground">Color: {item.color}</p>
                          <p className="text-lg font-semibold lg:hidden mt-2">${(item.product.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border rounded-md">
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}>
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-8 text-center text-sm">{item.quantity}</span>
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                           <p className="text-lg font-semibold w-24 text-right hidden lg:block">${(item.product.price * item.quantity).toFixed(2)}</p>
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.product.id, item.size, item.color)}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p className="font-semibold">${totalPrice.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Shipping</p>
                  <p className="font-semibold">Free</p>
                </div>
                <Separator />
                <div className="flex justify-between text-lg">
                  <p className="font-bold">Total</p>
                  <p className="font-bold">${totalPrice.toFixed(2)}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild size="lg" className="w-full">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground" strokeWidth={1} />
          <h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild className="mt-6">
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
