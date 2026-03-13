
"use client";

import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, doc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export default function AdminProductsPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const productsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, "products"), orderBy("createdAt", "desc"));
  }, [firestore]);

  const { data: products, isLoading } = useCollection<Product>(productsQuery);

  if (isUserLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;
  if (!user) {
    router.push("/account");
    return null;
  }

  const handleDelete = async (productId: string, productName: string) => {
    if (!confirm(`Are you sure you want to delete "${productName}"?`)) return;

    try {
      await deleteDoc(doc(firestore, "products", productId));
      toast({
        title: "Deleted",
        description: `${productName} has been removed.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-headline">Product Management</h1>
          <p className="text-muted-foreground">Manage your boutique's active inventory.</p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new"><Plus className="mr-2 h-4 w-4" /> Add Product</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Catalog ({products?.length || 0})</CardTitle>
          <CardDescription>Items currently visible on APTLY DRESSED.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
          ) : products && products.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map(product => {
                  const imageUrl = product.images?.[0] || "";
                  return (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="relative h-12 w-12 rounded bg-muted overflow-hidden border">
                          {imageUrl && <Image src={imageUrl} alt={product.name} fill className="object-cover" />}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-xs text-muted-foreground">{product.brand}</div>
                      </TableCell>
                      <TableCell><Badge variant="secondary">{product.category}</Badge></TableCell>
                      <TableCell>
                        <div className="font-semibold">${product.salePrice || product.price}</div>
                        {product.salePrice && <div className="text-xs text-muted-foreground line-through">${product.price}</div>}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {product.tags.map(tag => (
                            <Badge key={tag} className="text-[10px] px-1 h-4">{tag}</Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/products/${product.slug}`} target="_blank">
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id, product.name)} className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">You haven't added any products yet.</p>
              <Button asChild variant="outline">
                <Link href="/admin/products/new">Get Started</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
