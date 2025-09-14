'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Heart, Share2, MoreHorizontal, ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import MessageModal from './MessageModal';

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  seller_email: string;
  image_url: string;
  location: string;
  created_at: string;
  updated_at: string;
}

export default function ListingDetail() {
  const params = useParams();
  const listingId = params?.id as string;
  
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [message, setMessage] = useState('Is this available?');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const fetchListing = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('id', listingId)
        .single();

      if (error) {
        console.error('Error fetching listing:', error);
        return;
      }

      setListing(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [listingId]);

  useEffect(() => {
    if (listingId) {
      fetchListing();
    } else {
      setLoading(false);
    }
  }, [listingId, fetchListing]);

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!listing || !buyerEmail.trim()) return;

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Save message to database
      const { error: messageError } = await supabase
        .from('messages')
        .insert({
          listing_id: listing.id,
          buyer_email: buyerEmail,
          seller_email: listing.seller_email,
          message: message
        });

      if (messageError) {
        console.error('Error saving message:', messageError);
        setSubmitMessage('Error sending message. Please try again.');
        return;
      }

      setSubmitMessage('Message sent successfully!');
      setMessage('Is this available?');
      setBuyerEmail('');
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitMessage('');
      }, 5000);
    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage('Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading listing...</p>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Listing Not Found</h1>
          <p className="text-gray-600 mb-6">The listing you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/marketplace">
            <Button>Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-2 h-12">
          <div className="flex items-center space-x-3">
            <Link href="/marketplace">
              <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">f</span>
              </div>
              <span className="text-gray-600 text-sm font-medium">Marketplace</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button type="button" variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0" aria-label="Message">
              <MessageCircle className="w-4 h-4" />
            </Button>
            <Button type="button" variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0" aria-label="Like listing">
              <Heart className="w-4 h-4" />
            </Button>
            <Button type="button" variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0" aria-label="Share listing">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button type="button" variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0" aria-label="More options">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-48px)]">
        {/* Left side - Image */}
        <div className="flex-1 relative bg-gray-100">
          <div className="relative h-full flex items-center justify-center">
            <Image
              src={listing.image_url}
              alt={listing.title}
              width={800}
              height={600}
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />
            {/* Image navigation arrows */}
            <button 
              type="button"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
        </div>

        {/* Right side - Details */}
        <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-4 space-y-4">
            {/* Title and Price */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{listing.title}</h1>
              <p className="text-3xl font-bold text-green-600 mb-1">${listing.price}</p>
              <p className="text-sm text-gray-500">
                Listed about an hour ago in {listing.location}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button 
                type="button"
                onClick={() => setIsMessageModalOpen(true)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-9"
                aria-label="Send message"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
              <Button type="button" variant="outline" size="sm" className="h-9 w-9 p-0" aria-label="Save listing">
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button type="button" variant="outline" size="sm" className="h-9 w-9 p-0" aria-label="Share listing">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button type="button" variant="outline" size="sm" className="h-9 w-9 p-0" aria-label="More options">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>

            {/* Details */}
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Details</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Condition</span>
                    <span className="text-gray-900">Used - Good</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category</span>
                    <span className="text-gray-900">{listing.category}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{listing.description}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                <div className="text-sm text-gray-900">{listing.location}</div>
                <div className="text-xs text-gray-500">Location is approximate</div>
              </div>
            </div>

            {/* Seller Information */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-900 mb-3">Seller Information</h3>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">W</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Wei Gu</p>
                  <p className="text-sm text-gray-600">Joined Facebook in 2007</p>
                </div>
              </div>
              <button className="text-blue-600 text-sm mt-2 hover:underline">
                Seller details
              </button>
            </div>

            {/* Message Seller Form */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-900 mb-3">Send seller a message</h3>
              <form onSubmit={handleSubmitMessage} className="space-y-3">
                <div>
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    required
                    className="w-full h-9"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Is this available?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="w-full"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-9"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send'}
                </Button>
                {submitMessage && (
                  <div className={`p-3 rounded-md ${
                    submitMessage.includes('Error') 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    <p className="text-sm font-medium">{submitMessage}</p>
                  </div>
                )}
              </form>
            </div>

            {/* Sponsored Section */}
            <div className="border-t border-gray-200 pt-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-gray-300 rounded"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Sealy Mattress</p>
                    <p className="text-xs text-gray-500">Sponsored</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-2">Ding Ding! Sale Ends Soon!</p>
                <div className="w-full h-16 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-gray-500 text-xs">Video thumbnail</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Message Modal */}
      {listing && (
        <MessageModal
          isOpen={isMessageModalOpen}
          onClose={() => setIsMessageModalOpen(false)}
          listingId={listing.id}
          sellerEmail={listing.seller_email}
          listingTitle={listing.title}
        />
      )}
    </div>
  );
}