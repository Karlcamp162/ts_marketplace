'use client';

import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { categories } from '@/lib/data';

interface SidebarProps {
  onSearchChange: (search: string) => void;
  onCategoryChange: (category: string) => void;
  onPriceChange: (min: string, max: string) => void;
}

export default function Sidebar({ onSearchChange, onCategoryChange, onPriceChange }: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState('Q bike');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  return (
    <div className="w-72 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Marketplace Title */}
        <div className="mb-1">
          <h1 className="text-base font-medium text-gray-900">Marketplace</h1>
        </div>
        
        {/* Search Results Section */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Search results</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Q bike" 
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                onSearchChange(e.target.value);
              }}
              className="pl-10 bg-gray-50 border-gray-200 h-9"
            />
          </div>
        </div>

        {/* Sort by Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900">Sort by</h3>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Price</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex space-x-2">
              <Input 
                placeholder="Min" 
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(e.target.value);
                  onPriceChange(e.target.value, maxPrice);
                }}
                className="text-sm h-8" 
              />
              <Input 
                placeholder="Max" 
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                  onPriceChange(minPrice, e.target.value);
                }}
                className="text-sm h-8" 
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Delivery method</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Condition</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Date listed</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Availability</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Categories Section */}
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900">Categories</h3>
          <div className="space-y-1">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "ghost"}
                onClick={() => {
                  setSelectedCategory(category.id);
                  onCategoryChange(category.id);
                }}
                className="w-full justify-start text-left h-auto py-2 px-3 hover:bg-gray-50 text-gray-700"
              >
                <span className="mr-3 text-lg">{category.icon}</span>
                <span className="text-sm">{category.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
