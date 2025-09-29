
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
  PaginationEllipsis
} from "@/components/ui/pagination"
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const PRODUCTS_PER_PAGE = 12;

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
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
  const initialTags = searchParams.get('tags')?.split(',') || [];
  const maxPrice = Math.max(...allProducts.map(p => p.price), 300);
  
  const [filters, setFilters] = useState({
    category: initialCategory,
    sizes: [] as string[],
    colors: [] as string[],
    priceRange: [0, maxPrice] as [number, number],
    sortBy: 'newest',
    tags: initialTags as string[],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered: Product[] = [...allProducts];

    if (filters.category !== 'All') {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    
    if (filters.tags.length > 0) {
      filtered = filtered.filter(p => filters.tags.every(tag => p.tags.includes(tag)));
    }
    
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(p => p.sizes.some(s => filters.sizes.includes(s)));
    }
    
    if (filters.colors.length > 0) {
      filtered = filtered.filter(p => p.colors.some(c => filters.colors.includes(c.name)));
    }

    filtered = filtered.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

    if (filters.sortBy === 'price-asc') {
      filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    } else if (filters.sortBy === 'price-desc') {
      filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    } else if (filters.sortBy === 'newest') {
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
  
  const getPaginationItems = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 'ellipsis', totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, 'ellipsis', totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, 'ellipsis-start', currentPage, 'ellipsis-end', totalPages];
  };


  const pageTitle = filters.category !== 'All' ? filters.category : 'All Products';
  const pageDescription = filters.tags.includes('New Arrival') ? 'The latest additions to our curated collection.' : 'Discover our collection of timeless pieces.';

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-headline">Shop {pageTitle}</h1>
            <p className="mt-2 text-muted-foreground">{pageDescription}</p>
        </div>
        <div className="flex flex-col gap-8">
            <aside><Skeleton className="h-10 w-full" /></aside>
            <main><ProductGridSkeleton /></main>
        </div>
    </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-headline">Shop {pageTitle}</h1>
        <p className="mt-2 text-muted-foreground">{pageDescription}</p>
      </div>
        <ProductFilters filters={filters} setFilters={setFilters} allProducts={allProducts} />
        <main className="w-full mt-8">
            {paginatedProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
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
          {totalPages > 1 && (
            <Pagination className="mt-12">
              <PaginationContent>
                <PaginationItem>
                  <Button variant="ghost" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <PaginationPrevious className="hidden sm:flex" href="#" onClick={(e) => e.preventDefault()} />
                    <span className="sm:hidden">Prev</span>
                  </Button>
                </PaginationItem>
                
                <div className="hidden sm:flex items-center gap-1">
                  {getPaginationItems().map((page, index) => (
                    <PaginationItem key={index}>
                      {typeof page === 'number' ? (
                        <Button variant={currentPage === page ? 'default' : 'ghost'} onClick={() => handlePageChange(page)}>
                          {page}
                        </Button>
                      ) : (
                        <PaginationEllipsis />
                      )}
                    </PaginationItem>
                  ))}
                </div>

                <PaginationItem className="sm:hidden">
                    <span className="text-sm font-medium">
                        Page {currentPage} of {totalPages}
                    </span>
                </PaginationItem>

                <PaginationItem>
                  <Button variant="ghost" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    <PaginationNext className="hidden sm:flex" href="#" onClick={(e) => e.preventDefault()}/>
                    <span className="sm:hidden">Next</span>
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </main>
    </div>
  );
}
