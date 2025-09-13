'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import BrowseListings from '@/components/BrowseListings';
import ConfigCheck from '@/components/ConfigCheck';

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex h-[calc(100vh-60px)]">
        <Sidebar 
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
          onPriceChange={(min, max) => {
            setMinPrice(min);
            setMaxPrice(max);
          }}
        />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <ConfigCheck />
          <BrowseListings 
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </main>
      </div>
    </div>
  );
}
