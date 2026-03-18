
"use client";

import { useState, useEffect } from "react";
import { useUser, useFirestore } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";

const ADMIN_EMAIL = "aptlydressed@synctech.ie";

export default function AddProductPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isUserLoading) {
      if (!user || user.email !== ADMIN_EMAIL) {
        router.push("/account");
      }
    }
  }, [user, isUserLoading, router]);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    slug: "",
    price: "",
    salePrice: "",
    description: "",
    category: "Womens",
    tags: "New Arrival",
    sizes: "S, M, L",
    colors: "Black:#000000, White:#FFFFFF",
    details: "100% Organic Cotton",
    affiliateUrl: "",
    imageUrl: "",
  });

  if (isUserLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;
  if (!user || user.email !== ADMIN_EMAIL) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        salePrice: formData.salePrice ? parseFloat(formData.salePrice) : null,
        tags: formData.tags.split(",").map(t => t.trim()),
        sizes: formData.sizes.split(",").map(s => s.trim()),
        details: formData.details.split(",").map(d => d.trim()),
        colors: formData.colors.split(",").map(c => {
          const [name, hex] = c.split(":");
          return { name: name?.trim(), hex: hex?.trim() || "#000000" };
        }),
        images: formData.imageUrl.split(",").map(url => url.trim()).filter(Boolean),
        rating: 5,
        reviewCount: 0,
        stock: 100,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(firestore, "products"), productData);
      
      toast({
        title: "Product Created",
        description: `${formData.name} is now live!`,
      });
      router.push("/admin/products");
    } catch (error) {
      console.error("Error adding product:", error);
      toast({
        title: "Error",
        description: "Failed to create product. Please check your permissions.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Auto-generate slug from name
      slug: name === "name" ? value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : prev.slug
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/admin/products"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Products</Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Add New Product</CardTitle>
          <CardDescription>Fill in the details to add a new item to your boutique.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="The Elegant Midi" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input id="brand" name="brand" value={formData.brand} onChange={handleChange} required placeholder="Everlane" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Regular Price ($)</Label>
                <Input id="price" name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salePrice">Sale Price ($) - Optional</Label>
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
              <Input id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required placeholder="https://image1.com, https://image2.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="affiliateUrl">Partner Affiliate Link</Label>
              <Input id="affiliateUrl" name="affiliateUrl" value={formData.affiliateUrl} onChange={handleChange} required placeholder="https://brand.com/product?aff=aptly" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
               <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input id="tags" name="tags" value={formData.tags} onChange={handleChange} placeholder="New Arrival, Featured" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sizes">Sizes (comma separated)</Label>
                <Input id="sizes" name="sizes" value={formData.sizes} onChange={handleChange} placeholder="S, M, L, XL" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">Product Details (comma separated)</Label>
              <Textarea id="details" name="details" value={formData.details} onChange={handleChange} placeholder="100% Linen, Dry clean only, Made in Portugal" />
            </div>

            <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
              {loading ? <Loader2 className="animate-spin mr-2" /> : <Plus className="mr-2 h-5 w-5" />}
              Create Product
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
