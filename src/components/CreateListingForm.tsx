'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { categories } from '@/lib/data';
import { Upload, X, Camera } from 'lucide-react';

export default function CreateListingForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    seller_email: '',
    category: '',
    location: 'Palo Alto, CA'
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = [...imageFiles, ...acceptedFiles.slice(0, 5 - imageFiles.length)];
    setImageFiles(newFiles);
    
    const newPreviews = [...imagePreviews];
    acceptedFiles.slice(0, 5 - imageFiles.length).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        newPreviews.push(reader.result as string);
        setImagePreviews([...newPreviews]);
      };
      reader.readAsDataURL(file);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 5
  });

  const removeImage = (index: number) => {
    const newFiles = imageFiles.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      let imageUrl = '';

      // Upload first image if provided
      if (imageFiles.length > 0) {
        const file = imageFiles[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `listings/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('listing-images')
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        const { data } = supabase.storage
          .from('listing-images')
          .getPublicUrl(filePath);

        imageUrl = data.publicUrl;
      }

      // Create listing
      const { error } = await supabase
        .from('listings')
        .insert([
          {
            title: formData.title,
            description: formData.description,
            price: parseFloat(formData.price),
            seller_email: formData.seller_email,
            category: formData.category,
            location: formData.location,
            image_url: imageUrl
          }
        ]);

      if (error) {
        throw error;
      }

      setMessage('Listing created successfully!');
      setFormData({
        title: '',
        description: '',
        price: '',
        seller_email: '',
        category: '',
        location: 'Palo Alto, CA'
      });
      setImageFiles([]);
      setImagePreviews([]);
    } catch (error) {
      console.error('Error creating listing:', error);
      setMessage(`Error creating listing: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Form Section */}
        <div className="flex-1 bg-white p-6 overflow-y-auto">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">f</span>
              </div>
              <span className="text-gray-600 text-lg font-medium">Marketplace</span>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Listing</h1>
              <p className="text-gray-600">Fill out the details below to create your listing</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Photos Section */}
              <div>
                <label className="block text-sm font-medium mb-3">Photos</label>
                <div className="grid grid-cols-2 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 h-6 w-6 p-0"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  {imagePreviews.length < 5 && (
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors h-32 flex flex-col items-center justify-center ${
                        isDragActive ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                    >
                      <input {...getInputProps()} />
                      <Camera className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Add Photo</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="What are you selling?"
                  required
                  className="h-10"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium mb-2">Price</label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  required
                  className="h-10"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Palo Alto, CA"
                  required
                  className="h-10"
                />
              </div>

              {/* Contact Email */}
              <div>
                <label className="block text-sm font-medium mb-2">Contact Email</label>
                <Input
                  type="email"
                  value={formData.seller_email}
                  onChange={(e) => setFormData({ ...formData, seller_email: e.target.value })}
                  placeholder="your.email@example.com"
                  required
                  className="h-10"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your item..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 h-10"
              >
                {isSubmitting ? 'Creating Listing...' : 'Create Listing'}
              </Button>

              {/* Message */}
              {message && (
                <div className={`p-3 rounded-md ${
                  message.includes('successfully') 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Preview Section */}
        <div className="w-[500px] bg-white border-l border-gray-200 p-6 overflow-y-auto">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Preview</h2>
            <p className="text-sm text-gray-600">This is how your listing will appear to buyers</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            {/* Image Preview */}
            <div className="aspect-square bg-gray-100 flex items-center justify-center">
              {imagePreviews.length > 0 ? (
                <img
                  src={imagePreviews[0]}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-gray-400">
                  <Camera className="h-12 w-12 mx-auto mb-2" />
                  <p className="text-sm">No image selected</p>
                </div>
              )}
            </div>

            {/* Details Preview */}
            <div className="p-4 space-y-3">
              <h3 className="text-xl font-bold text-gray-900">
                {formData.title || 'Enter a title...'}
              </h3>
              <p className="text-2xl font-bold text-green-600">
                {formData.price ? `$${formData.price}` : '$0'}
              </p>
              <p className="text-sm text-gray-500">
                Listed just now in {formData.location || 'Palo Alto, CA'}
              </p>
              
              {formData.category && (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category</span>
                    <span className="text-gray-900">{getCategoryName(formData.category)}</span>
                  </div>
                </div>
              )}
              
              {formData.description && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Description</h4>
                  <p className="text-gray-700 text-sm">
                    {formData.description}
                  </p>
                </div>
              )}
              
              {formData.seller_email && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Seller Information</h4>
                  <p className="text-sm text-gray-600">{formData.seller_email}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}