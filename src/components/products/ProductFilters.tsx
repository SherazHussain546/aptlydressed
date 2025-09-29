
"use client";

import { useMemo } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { Check } from 'lucide-react';


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

    return (
        <aside className="w-full lg:w-1/4 lg:max-w-xs">
            <Card>
                <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Filters</h3>
                      <div className="lg:hidden">
                          <Select onValueChange={handleSortChange} defaultValue={filters.sortBy}>
                              <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Sort by" />
                              </SelectTrigger>
                              <SelectContent>
                                  <SelectItem value="newest">Newest</SelectItem>
                                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                              </SelectContent>
                          </Select>
                      </div>
                    </div>

                    <div className="hidden lg:block mb-6">
                        <Label>Sort by</Label>
                         <Select onValueChange={handleSortChange} defaultValue={filters.sortBy}>
                            <SelectTrigger>
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="newest">Newest</SelectItem>
                                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Accordion type="multiple" defaultValue={['category', 'size', 'price']} className="w-full">
                        <AccordionItem value="category">
                            <AccordionTrigger>Category</AccordionTrigger>
                            <AccordionContent>
                                <RadioGroup value={filters.category} onValueChange={handleCategoryChange} className="space-y-1">
                                    {allCategories.map(category => (
                                        <div key={category} className="flex items-center space-x-2 p-1 -m-1 rounded-md transition-colors hover:bg-accent/50">
                                            <RadioGroupItem value={category} id={`cat-${category}`} />
                                            <Label htmlFor={`cat-${category}`} className="font-normal cursor-pointer flex-1">{category}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="size">
                            <AccordionTrigger>Size</AccordionTrigger>
                            <AccordionContent>
                                <div className="grid grid-cols-4 gap-2 pt-2">
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
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="color">
                            <AccordionTrigger>Color</AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-wrap gap-3 pt-2">
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
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="price">
                            <AccordionTrigger>Price</AccordionTrigger>
                            <AccordionContent>
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
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </aside>
    );
}
