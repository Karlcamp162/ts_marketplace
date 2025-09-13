'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/lib/data';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer bg-white rounded-lg">
      <div className="aspect-[4/3] bg-gray-100 relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-3">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <h3 className="text-sm text-gray-900 line-clamp-2 leading-tight">
            {product.title}
          </h3>
          <p className="text-xs text-gray-500">{product.location}</p>
        </div>
      </CardContent>
    </Card>
  );
}
