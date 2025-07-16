'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, SortAsc } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { filterByCategory, searchProducts } from '@/lib/features/productsSlice';
import ProductCard from '@/components/shared/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ShopPage() {
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [searchQuery, setSearchQuery] = useState('');
  const { filteredItems, categories, selectedCategory } = useAppSelector(state => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(searchProducts(searchQuery));
  }, [searchQuery, dispatch]);

  const sortedProducts = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleCategoryFilter = (category: string) => {
    dispatch(filterByCategory(category));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Shop All Shoes</h1>
          <p className="text-lg text-gray-600">
            Discover our complete collection of premium footwear for every style and occasion.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search
                  </label>
                  <Input
                    placeholder="Search shoes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <Select
                    value={selectedCategory || 'all'}
                    onValueChange={handleCategoryFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      handleCategoryFilter('all');
                      setSortBy('name');
                    }}
                    className="w-full"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Clear Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center space-x-4">
            <span className="text-lg font-medium text-gray-900">
              {sortedProducts.length} Products
            </span>
            {selectedCategory && selectedCategory !== 'all' && (
              <Badge variant="secondary">
                {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-gray-500">
              <SortAsc className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p>Try adjusting your search criteria or filters.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}