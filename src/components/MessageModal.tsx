'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send, ArrowLeft } from 'lucide-react';

interface Message {
  id: string;
  message: string;
  buyer_email: string;
  seller_email: string;
  created_at: string;
  is_buyer: boolean;
}

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  listingId: string;
  sellerEmail: string;
  listingTitle: string;
}

export default function MessageModal({ isOpen, onClose, listingId, sellerEmail, listingTitle }: MessageModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && listingId) {
      fetchMessages();
    }
  }, [isOpen, listingId]);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('listing_id', listingId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        return;
      }

      // Transform messages to include is_buyer flag
      const transformedMessages = data?.map(msg => ({
        ...msg,
        is_buyer: msg.buyer_email === buyerEmail
      })) || [];

      setMessages(transformedMessages);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !buyerEmail.trim()) return;

    setIsSubmitting(true);

    try {
      // Save message to database
      const { error: messageError } = await supabase
        .from('messages')
        .insert({
          listing_id: listingId,
          buyer_email: buyerEmail,
          seller_email: sellerEmail,
          message: newMessage
        });

      if (messageError) {
        console.error('Error saving message:', messageError);
        return;
      }

      // Message saved successfully

      // Add message to local state immediately
      const newMsg: Message = {
        id: Date.now().toString(),
        message: newMessage,
        buyer_email: buyerEmail,
        seller_email: sellerEmail,
        created_at: new Date().toISOString(),
        is_buyer: true
      };

      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 rounded-full p-0">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h3 className="font-semibold text-gray-900">{listingTitle}</h3>
              <p className="text-sm text-gray-500">with seller</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 rounded-full p-0">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.is_buyer ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.is_buyer
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                  <p className={`text-xs mt-1 ${
                    message.is_buyer ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.created_at)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          {!buyerEmail ? (
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email to start messaging"
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                className="w-full"
              />
              <Button
                onClick={() => setBuyerEmail(buyerEmail)}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!buyerEmail.trim()}
              >
                Start Conversation
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
                disabled={!newMessage.trim() || isSubmitting}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
