'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { useAppDispatch } from '@/hooks/useRedux';
import { addProduct } from '@/lib/features/productsSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

export default function CreateProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    image: '',
    category: '',
    brand: '',
    description: '',
    features: '',
    inStock: true,
    sizes: [] as number[],
    colors: [] as string[],
  });

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSizeToggle = (size: number) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size].sort((a, b) => a - b)
    }));
  };

  const handleColorChange = (colors: string) => {
    setFormData(prev => ({
      ...prev,
      colors: colors.split(',').map(c => c.trim()).filter(c => c.length > 0)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      image: formData.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
      otherImages: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop'],
      category: formData.category as 'men' | 'women' | 'kids',
      brand: formData.brand,
      sizes: formData.sizes,
      colors: formData.colors,
      description: formData.description,
      features: formData.features.split('\n').filter(f => f.trim().length > 0),
      inStock: formData.inStock,
      rating: 4.0,
      reviews: 0,
    };

    dispatch(addProduct(newProduct));
    router.push('/admin/dashboard');
  };

  const availableSizes = [6, 7, 8, 9, 10, 11, 12, 13];
  const sampleColors = ['Black', 'White', 'Blue', 'Red', 'Gray', 'Brown', 'Green', 'Pink'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/admin/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Create New Product
          </h1>
          <p className="text-lg text-gray-600">
            Add a new product to your store inventory.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Air Max Running Shoes"
                    />
                  </div>
                  <div>
                    <Label htmlFor="brand">Brand *</Label>
                    <Input
                      id="brand"
                      name="brand"
                      required
                      value={formData.brand}
                      onChange={handleInputChange}
                      placeholder="Nike"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <Label>Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="men">Men</SelectItem>
                      <SelectItem value="women">Women</SelectItem>
                      <SelectItem value="kids">Kids</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="price">Price * ($)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="1290.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="originalPrice">Original Price ($)</Label>
                    <Input
                      id="originalPrice"
                      name="originalPrice"
                      type="number"
                      step="0.01"
                      value={formData.originalPrice}
                      onChange={handleInputChange}
                      placeholder="1590.00"
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    type="url"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Leave empty to use a default image
                  </p>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Premium running shoes with advanced cushioning technology..."
                    rows={3}
                  />
                </div>

                {/* Features */}
                <div>
                  <Label htmlFor="features">Features (one per line)</Label>
                  <Textarea
                    id="features"
                    name="features"
                    value={formData.features}
                    onChange={handleInputChange}
                    placeholder="Air Max cushioning&#10;Breathable mesh upper&#10;Durable rubber outsole"
                    rows={4}
                  />
                </div>

                {/* Sizes */}
                <div>
                  <Label>Available Sizes *</Label>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mt-2">
                    {availableSizes.map((size) => (
                      <div key={size} className="flex items-center space-x-2">
                        <Checkbox
                          id={`size-${size}`}
                          checked={formData.sizes.includes(size)}
                          onCheckedChange={() => handleSizeToggle(size)}
                        />
                        <Label htmlFor={`size-${size}`} className="text-sm">
                          {size}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <Label htmlFor="colors">Available Colors (comma-separated)</Label>
                  <Input
                    id="colors"
                    name="colors"
                    value={formData.colors.join(', ')}
                    onChange={(e) => handleColorChange(e.target.value)}
                    placeholder="Black, White, Blue"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Common colors: {sampleColors.join(', ')}
                  </p>
                </div>

                {/* Stock Status */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="inStock"
                    checked={formData.inStock}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, inStock: checked as boolean }))}
                  />
                  <Label htmlFor="inStock">In Stock</Label>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-6">
                  <Link href="/admin/dashboard">
                    <Button variant="outline">Cancel</Button>
                  </Link>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    <Save className="w-4 h-4 mr-2" />
                    Create Product
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}