
"use client";

import { useMemo } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Check, SlidersHorizontal, ArrowUpDown } from 'lucide-react';


interface ProductFiltersProps {
    filters: any;
    setFilters: (filters: any) => void;
    allProducts: Product[];
}

export function ProductFilters({ filters, setFilters, allProducts }: ProductFiltersProps) {

    const {allCategories, allSizes, allColors, maxPrice} = useMemo(() => {
        const categories = ['All', ...Array.from(new Set(allProducts.map(p => p.category)))];
        const sizes = Array.from(new Set(allProducts.flatMap(p => p.sizes))).sort();
        const colors = Array.from(new Set(allProducts.flatMap(p => p.colors.map(c => c.name)))).map(name => {
            const colorInfo = allProducts.find(p => p.colors.some(c => c.name === name))?.colors.find(c => c.name === name);
            return { name, hex: colorInfo?.hex || '#000000' };
        }).sort((a,b) => a.name.localeCompare(b.name));
        
        const uniqueColors = Array.from(new Map(colors.map(item => [item.name, item])).values());
        
        const price = Math.max(...allProducts.map(p => p.price), 300);
        return { allCategories: categories, allSizes: sizes, allColors: uniqueColors, maxPrice: price };
    }, [allProducts]);

    const handleCategoryChange = (value: string) => {
        setFilters({ ...filters, category: value });
    };

    const handleSizeChange = (size: string) => {
        const newSizes = filters.sizes.includes(size)
            ? filters.sizes.filter((s: string) => s !== size)
            : [...filters.sizes, size];
        setFilters({ ...filters, sizes: newSizes });
    };

    const handleColorChange = (color: string) => {
        const newColors = filters.colors.includes(color)
            ? filters.colors.filter((c: string) => c !== color)
            : [...filters.colors, color];
        setFilters({ ...filters, colors: newColors });
    };

    const handlePriceChange = (value: number[]) => {
        setFilters({ ...filters, priceRange: value });
    }

    const handleSortChange = (value: string) => {
        setFilters({ ...filters, sortBy: value });
    }

    const clearFilters = () => {
        setFilters({
            category: 'All',
            sizes: [],
            colors: [],
            priceRange: [0, maxPrice],
            sortBy: filters.sortBy,
        });
    }

    const activeFilterCount =
        (filters.category !== 'All' ? 1 : 0) +
        filters.sizes.length +
        filters.colors.length +
        (filters.priceRange[0] !== 0 || filters.priceRange[1] !== maxPrice ? 1 : 0);

    return (
        <div className="flex items-center justify-between lg:justify-end gap-4 mb-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                        Filter
                        {activeFilterCount > 0 && <span className="ml-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{activeFilterCount}</span>}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 p-4 space-y-4" align="start">
                    <div>
                        <h4 className="font-semibold text-sm mb-2">Category</h4>
                        <div className="space-y-1">
                            {allCategories.map(category => (
                                <Button
                                    key={category}
                                    variant={filters.category === category ? 'secondary' : 'ghost'}
                                    size="sm"
                                    onClick={() => handleCategoryChange(category)}
                                    className="w-full justify-start font-normal"
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>
                    </div>
                     <div>
                        <h4 className="font-semibold text-sm mb-2">Size</h4>
                        <div className="grid grid-cols-4 gap-2">
                            {allSizes.map(size => (
                                <Button
                                    key={size}
                                    variant={filters.sizes.includes(size) ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => handleSizeChange(size)}
                                    className="font-normal"
                                >
                                    {size}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm mb-2">Color</h4>
                         <div className="flex flex-wrap gap-3">
                            {allColors.map(color => (
                                <button
                                    key={color.name}
                                    title={color.name}
                                    onClick={() => handleColorChange(color.name)}
                                    className={cn(
                                        "h-8 w-8 rounded-full border-2 transition-all",
                                        filters.colors.includes(color.name) ? 'border-primary scale-110' : 'border-transparent'
                                    )}
                                >
                                    <div
                                        className="h-full w-full rounded-full border border-border/20 flex items-center justify-center"
                                        style={{ backgroundColor: color.hex }}
                                    >
                                    {filters.colors.includes(color.name) && <Check className="h-4 w-4 text-white mix-blend-difference" />}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm mb-2">Price</h4>
                         <div className="p-2">
                            <Slider
                                defaultValue={[0, maxPrice]}
                                max={maxPrice}
                                step={10}
                                onValueCommit={handlePriceChange}
                                value={filters.priceRange}
                            />
                            <div className="flex justify-between text-sm text-muted-foreground mt-2">
                                <span>${filters.priceRange[0]}</span>
                                <span>${filters.priceRange[1]}</span>
                            </div>
                        </div>
                    </div>

                    {activeFilterCount > 0 && (
                        <Button variant="ghost" size="sm" onClick={clearFilters} className="w-full">
                            Clear Filters
                        </Button>
                    )}

                </DropdownMenuContent>
            </DropdownMenu>
            
            <Select onValueChange={handleSortChange} defaultValue={filters.sortBy}>
                <SelectTrigger className="w-[180px]">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
