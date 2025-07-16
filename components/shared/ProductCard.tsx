'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/types';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { addToCart } from '@/lib/features/cartSlice';
import { addToWishlist, removeFromWishlist } from '@/lib/features/wishlistSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector(state => state.wishlist.items);
  
  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, size: selectedSize, color: selectedColor }));
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      
    >
      <Card className="group relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 ${
              isInWishlist ? 'text-red-500 bg-red-50' : 'text-gray-400 bg-white/80'
            } hover:bg-white hover:text-red-500 transition-colors`}
            onClick={handleWishlistToggle}
          >
            <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
          </Button>

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              -{discountPercentage}%
            </Badge>
          )}

          {/* Quick Add Button */}
          {/* <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Button onClick={handleAddToCart} className="w-full bg-blue-600 hover:bg-blue-700">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Quick Add
            </Button>
          </motion.div> */}

          <div
            
            className="absolute bottom-2 left-2 right-2 sm:opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Button onClick={handleAddToCart} className="w-full bg-blue-600 hover:bg-blue-700">
              <ShoppingCart className="w-4 h-4 mr-2" />
              <span className=''>Quick Add</span>
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 uppercase">{product.brand}</span>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviews})</span>
            </div>
          </div>

          <Link href={`/products`}>
                    {/* <Link href={`/product/${product.id}`}> */}

            <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center space-x-2 mt-2">
            <span className="text-lg font-bold text-gray-900">KES {product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">KES {product.originalPrice}</span>
            )}
          </div>

          {/* Color Options */}
          <div className="flex items-center space-x-2 mt-3">
            <span className="text-sm text-gray-600">Colors:</span>
            <div className="flex space-x-1">
              {product.colors.slice(0, 3).map((color) => (
                <button
                  key={color}
                  className={`w-4 h-4 rounded-full border-2 ${
                    selectedColor === color ? 'border-blue-500' : 'border-gray-300'
                  }`}
                  style={{
                    backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' :
                                   color.toLowerCase() === 'black' ? '#000000' :
                                   color.toLowerCase() === 'blue' ? '#3b82f6' :
                                   color.toLowerCase() === 'red' ? '#ef4444' :
                                   color.toLowerCase() === 'green' ? '#10b981' :
                                   color.toLowerCase() === 'gray' ? '#6b7280' :
                                   color.toLowerCase() === 'brown' ? '#a3663c' :
                                   color.toLowerCase() === 'pink' ? '#ec4899' :
                                   color.toLowerCase() === 'purple' ? '#8b5cf6' :
                                   color.toLowerCase() === 'yellow' ? '#f59e0b' :
                                   color.toLowerCase() === 'orange' ? '#f97316' :
                                   color.toLowerCase() === 'navy' ? '#1e40af' :
                                   color.toLowerCase() === 'tan' ? '#d2b48c' :
                                   '#9ca3af'
                  }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}