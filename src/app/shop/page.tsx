"use client";

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { products } from '@/lib/data';
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

const PRODUCTS_PER_PAGE = 12;

export default function ShopPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [filters, setFilters] = useState({
    category: initialCategory,
    sizes: [] as string[],
    colors: [] as string[],
    priceRange: [0, 300] as [number, number],
    sortBy: 'newest',
  });
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    let filtered: Product[] = [...products];

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
      filtered.sort((a, b) => (b.tags.includes('New Arrival') ? 1 : 0) - (a.tags.includes('New Arrival') ? 1 : 0));
    }

    return filtered;
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-headline">Shop {filters.category !== 'All' ? filters.category : ''}</h1>
        <p className="mt-2 text-muted-foreground">Discover our collection of timeless pieces.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <ProductFilters filters={filters} setFilters={setFilters} />
        <main className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {paginatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
            </div>
          )}
          {totalPages > 1 && (
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
