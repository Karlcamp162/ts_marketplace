'use client';

import { useState, useEffect } from 'react';
import { supabase, Listing } from '@/lib/supabase';
import ProductCard from './ProductCard';
import Link from 'next/link';

interface BrowseListingsProps {
  searchTerm?: string;
  selectedCategory?: string;
  minPrice?: string;
  maxPrice?: string;
}

export default function BrowseListings({ searchTerm = '', selectedCategory = '', minPrice = '', maxPrice = '' }: BrowseListingsProps) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    filterListings();
  }, [listings, searchTerm, selectedCategory, minPrice, maxPrice]);

  const fetchListings = async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setListings(data || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterListings = () => {
    let filtered = listings;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (listing) =>
          listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          listing.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((listing) => listing.category === selectedCategory);
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      filtered = filtered.filter((listing) => {
        const price = listing.price;
        const min = minPrice ? parseFloat(minPrice) : 0;
        const max = maxPrice ? parseFloat(maxPrice) : Infinity;
        return price >= min && price <= max;
      });
    }

    setFilteredListings(filtered);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading listings...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          {filteredListings.length} listing{filteredListings.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Listings Grid */}
      {filteredListings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No listings found</p>
          <p className="text-gray-400 mt-2">
            {searchTerm || selectedCategory || minPrice || maxPrice
              ? 'Try adjusting your search or filters'
              : 'Be the first to create a listing!'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredListings.map((listing) => (
            <Link key={listing.id} href={`/listing/${listing.id}`}>
              <div className="cursor-pointer">
                <ProductCard product={{
                  id: listing.id,
                  title: listing.title,
                  price: listing.price,
                  image: listing.image_url || 'https://picsum.photos/300/200?random=placeholder',
                  location: listing.location,
                  description: listing.description
                }} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
