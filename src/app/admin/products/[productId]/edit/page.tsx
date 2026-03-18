
"use client";

import { useState, useEffect } from "react";
import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/lib/types";

const ADMIN_EMAIL = "aptlydressed@synctech.ie";

export default function EditProductPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const params = useParams();
  const productId = params?.productId as string;
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const productRef = useMemoFirebase(() => {
    if (!firestore || !productId) return null;
    return doc(firestore, "products", productId);
  }, [firestore, productId]);

  const { data: product, isLoading: isProductLoading } = useDoc<Product>(productRef);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    slug: "",
    price: "",
    salePrice: "",
    description: "",
    category: "Womens",
    tags: "",
    sizes: "",
    colors: "",
    details: "",
    affiliateUrl: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (!isUserLoading) {
      if (!user || user.email !== ADMIN_EMAIL) {
        router.push("/account");
      }
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        brand: product.brand || "",
        slug: product.slug || "",
        price: product.price?.toString() || "",
        salePrice: product.salePrice?.toString() || "",
        description: product.description || "",
        category: product.category || "Womens",
        tags: product.tags?.join(", ") || "",
        sizes: product.sizes?.join(", ") || "",
        colors: product.colors?.map(c => `${c.name}:${c.hex}`).join(", ") || "",
        details: product.details?.join(", ") || "",
        affiliateUrl: product.affiliateUrl || "",
        imageUrl: product.images?.join(", ") || "",
      });
    }
  }, [product]);

  if (isUserLoading || isProductLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;
  if (!user || user.email !== ADMIN_EMAIL) return null;
  if (!product) return <div className="text-center p-20">Product not found.</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const finalSlug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    
    const productData = {
      ...formData,
      slug: finalSlug,
      price: parseFloat(formData.price),
      salePrice: formData.salePrice ? parseFloat(formData.salePrice) : null,
      tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
      sizes: formData.sizes.split(",").map(s => s.trim()).filter(Boolean),
      details: formData.details.split(",").map(d => d.trim()).filter(Boolean),
      colors: formData.colors.split(",").map(c => {
        const [name, hex] = c.split(":");
        return { name: name?.trim() || "Color", hex: hex?.trim() || "#000000" };
      }),
      images: formData.imageUrl.split(",").map(url => url.trim()).filter(Boolean),
      updatedAt: serverTimestamp(),
    };

    // Non-blocking update per guidelines
    updateDoc(doc(firestore, "products", productId), productData)
      .catch((error) => {
        console.error("Error updating product:", error);
        toast({
          title: "Error",
          description: "Failed to update product.",
          variant: "destructive",
        });
      });
    
    toast({
      title: "Product Updated",
      description: `${formData.name} has been updated successfully.`,
    });
    router.push("/admin/products");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/admin/products"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Products</Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Edit Product</CardTitle>
          <CardDescription>Modify the details for {product.name}.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input id="brand" name="brand" value={formData.brand} onChange={handleChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug</Label>
              <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Regular Price (€)</Label>
                <Input id="price" name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salePrice">Sale Price (€)</Label>
                <Input id="salePrice" name="salePrice" type="number" step="0.01" value={formData.salePrice} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select 
                id="category" 
                name="category" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.category}
                onChange={handleChange as any}
              >
                <option value="Womens">Womens</option>
                <option value="Mens">Mens</option>
                <option value="Shoes">Shoes</option>
                <option value="Essentials">Essentials</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows={3} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URLs (comma separated)</Label>
              <Input id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="affiliateUrl">Partner Affiliate Link</Label>
              <Input id="affiliateUrl" name="affiliateUrl" value={formData.affiliateUrl} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
               <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input id="tags" name="tags" value={formData.tags} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sizes">Sizes (comma separated)</Label>
                <Input id="sizes" name="sizes" value={formData.sizes} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="colors">Colors (Format: Name:Hex, comma separated)</Label>
              <Input id="colors" name="colors" value={formData.colors} onChange={handleChange} placeholder="Black:#000000, White:#FFFFFF" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">Product Details (comma separated)</Label>
              <Textarea id="details" name="details" value={formData.details} onChange={handleChange} rows={3} />
            </div>

            <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
              {loading ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2 h-5 w-5" />}
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
