"use client";

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { ProductCard } from '@/components/products/ProductCard';
import { ProductFilters } from '@/components/products/ProductFilters';
import type { Product } from '@/lib/types';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const PRODUCTS_PER_PAGE = 12;

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
      {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="aspect-[4/5] w-full" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
        </div>
      ))}
    </div>
  );
}

interface ShopProps {
  allProducts: Product[];
}

export function Shop({ allProducts }: ShopProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  
  const [filters, setFilters] = useState({
    category: initialCategory,
    sizes: [] as string[],
    colors: [] as string[],
    priceRange: [0, 1000] as [number, number], // Increased price range
    sortBy: 'newest',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered: Product[] = [...allProducts];

    // Category filter
    if (filters.category !== 'All') {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    
    // Size filter
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(p => p.sizes.some(s => filters.sizes.includes(s)));
    }
    
    // Color filter
    if (filters.colors.length > 0) {
      filtered = filtered.filter(p => p.colors.some(c => filters.colors.includes(c.name)));
    }

    // Price range filter
    filtered = filtered.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

    // Sorting
    if (filters.sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'newest') {
      // Assuming 'id' can represent recency. Or you can add a date field.
      // For now, let's sort by ID descending as a proxy for newest.
      filtered.sort((a, b) => (b.id > a.id ? 1 : -1));
    }

    return filtered;
  }, [filters, allProducts]);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if(page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  }

  // To avoid hydration mismatch on category heading
  const pageTitle = filters.category !== 'All' ? filters.category : '';

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-headline">Shop {pageTitle}</h1>
            <p className="mt-2 text-muted-foreground">Discover our collection of timeless pieces.</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-1/4 lg:max-w-xs"><Skeleton className="h-[500px] w-full" /></aside>
            <main className="w-full"><ProductGridSkeleton /></main>
        </div>
    </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-headline">Shop {pageTitle}</h1>
        <p className="mt-2 text-muted-foreground">Discover our collection of timeless pieces.</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <ProductFilters filters={filters} setFilters={setFilters} allProducts={allProducts} />
        <main className="w-full">
            {isLoading ? <ProductGridSkeleton /> : 
                paginatedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                        {paginatedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
                    </div>
                )
            }
          {totalPages > 1 && !isLoading && (
            <Pagination className="mt-12">
              <PaginationContent>
                <PaginationItem>
                  <Button variant="ghost" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <PaginationPrevious href="#" onClick={(e) => e.preventDefault()} />
                  </Button>
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <PaginationItem key={page}>
                    <Button variant={currentPage === page ? 'default' : 'ghost'} onClick={() => handlePageChange(page)}>
                      {page}
                    </Button>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <Button variant="ghost" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    <PaginationNext href="#" onClick={(e) => e.preventDefault()}/>
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </main>
      </div>
    </div>
  );
}
