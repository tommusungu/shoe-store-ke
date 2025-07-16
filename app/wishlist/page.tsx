'use client';

import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { removeFromWishlist } from '@/lib/features/wishlistSlice';
import { addToCart } from '@/lib/features/cartSlice';
import ProductCard from '@/components/shared/ProductCard';
import { Button } from '@/components/ui/button';

export default function WishlistPage() {
  const wishlistItems = useAppSelector(state => state.wishlist.items);
  const dispatch = useAppDispatch();

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Heart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h1>
          <p className="text-lg text-gray-600 mb-8">
            Save items you love to your wishlist and never lose track of them.
          </p>
          <Button asChild>
            <a href="/shop">Continue Shopping</a>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            My Wishlist ({wishlistItems.length})
          </h1>
          <p className="text-lg text-gray-600">
            Items you've saved for later consideration.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {wishlistItems.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}