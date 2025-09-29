"use client";

import { useMemo } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Product } from '@/lib/types';


interface ProductFiltersProps {
    filters: any;
    setFilters: (filters: any) => void;
    allProducts: Product[];
}

export function ProductFilters({ filters, setFilters, allProducts }: ProductFiltersProps) {

    const {allCategories, allSizes, allColors, maxPrice} = useMemo(() => {
        const categories = ['All', ...Array.from(new Set(allProducts.map(p => p.category)))];
        const sizes = Array.from(new Set(allProducts.flatMap(p => p.sizes))).sort();
        const colors = Array.from(new Set(allProducts.flatMap(p => p.colors.map(c => c.name)))).sort();
        const price = Math.max(...allProducts.map(p => p.price), 300);
        return { allCategories: categories, allSizes: sizes, allColors: colors, maxPrice: price };
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
                                        <div key={category} className="flex items-center space-x-2 p-1 -m-1 rounded-md transition-colors hover:bg-accent">
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
                                <div className="grid grid-cols-3 gap-2">
                                    {allSizes.map(size => (
                                        <div key={size} className="flex items-center space-x-2 p-1 -m-1 rounded-md transition-colors hover:bg-accent">
                                            <Checkbox
                                                id={`size-${size}`}
                                                checked={filters.sizes.includes(size)}
                                                onCheckedChange={() => handleSizeChange(size)}
                                            />
                                            <Label htmlFor={`size-${size}`} className="font-normal cursor-pointer flex-1">{size}</Label>
                                        </div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="color">
                            <AccordionTrigger>Color</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-1">
                                    {allColors.map(color => (
                                        <div key={color} className="flex items-center space-x-2 p-1 -m-1 rounded-md transition-colors hover:bg-accent">
                                            <Checkbox
                                                id={`color-${color}`}
                                                checked={filters.colors.includes(color)}
                                                onCheckedChange={() => handleColorChange(color)}
                                            />
                                            <Label htmlFor={`color-${color}`} className="font-normal cursor-pointer flex-1">{color}</Label>
                                        </div>
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
