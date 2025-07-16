'use client'
import { useState } from 'react';
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw } from 'lucide-react';

// Dummy data
const dummyProduct = {
  id: '2',
  name: 'Classic Leather Sneakers',
  price: 890.00,
  originalPrice: 1200.00, // Added for discount display
  image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop',
   otherImages: [
    'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=500&h=500&fit=crop'
  ],


  category: 'women',
  brand: 'Adidas',
  sizes: [6, 7, 8, 9, 10],
  colors: ['White', 'Pink', 'Black'],
  description: 'Timeless leather sneakers for everyday wear. These premium sneakers combine classic styling with modern comfort, making them perfect for any occasion.',
  features: ['Premium leather upper', 'Comfortable insole', 'Classic design', 'Durable rubber outsole', 'Breathable lining'],
  inStock: true,
  rating: 4.3,
  reviews: 89,
};

const mockReviews = [
  {
    id: '1',
    productId: '2',
    userName: 'Sarah Johnson',
    rating: 5,
    comment: 'Amazing quality! These sneakers are so comfortable and stylish.',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    productId: '2',
    userName: 'Mike Chen',
    rating: 4,
    comment: 'Great sneakers, love the leather quality. Runs slightly small.',
    createdAt: new Date('2024-01-20')
  },
  {
    id: '3',
    productId: '2',
    userName: 'Emma Davis',
    rating: 5,
    comment: 'Perfect for everyday wear. The comfort is outstanding!',
    createdAt: new Date('2024-01-25')
  }
];

const relatedProducts = [
  {
    id: '3',
    name: 'Running Sneakers',
    price: 750.00,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    brand: 'Nike',
    rating: 4.5,
    reviews: 124
  },
  {
    id: '4',
    name: 'Canvas Shoes',
    price: 450.00,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&h=500&fit=crop',
    brand: 'Converse',
    rating: 4.2,
    reviews: 67
  }
];

export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const product = dummyProduct;
  const productReviews = mockReviews;

  // Create array of all images (main image + other images)
  const allImages = [product.image, ...product.otherImages];

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }
    alert(`Added to cart: ${product.name} - Size: ${selectedSize}, Color: ${selectedColor}`);
  };

  const handleWishlistToggle = () => {
    setIsInWishlist(!isInWishlist);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative">
              <img
                src={allImages[selectedImageIndex]}
                alt={product.name}
                className="w-full rounded-2xl shadow-lg"
              />
              {discountPercentage > 0 && (
                <span className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                  -{discountPercentage}% OFF
                </span>
              )}
            </div>

            {/* Image Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index 
                        ? 'border-blue-500 ring-2 ring-blue-200' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium mb-2 inline-block">
                {product.brand}
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">KES {product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">KES {product.originalPrice}</span>
                )}
              </div>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Size *
              </label>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`aspect-square border rounded-md font-medium transition-colors ${
                      selectedSize === size 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Color *
              </label>
              <select 
                value={selectedColor} 
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a color</option>
                {product.colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>

            {/* Add to Cart */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`p-3 rounded-md border transition-colors ${
                  isInWishlist 
                    ? 'text-red-500 border-red-500 bg-red-50' 
                    : 'text-gray-500 border-gray-300 hover:border-gray-400'
                }`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <span className="text-sm text-gray-600">Free Shipping</span>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <span className="text-sm text-gray-600">Secure Payment</span>
              </div>
              <div className="text-center">
                <RotateCcw className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <span className="text-sm text-gray-600">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['description', 'features', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab} {tab === 'reviews' && `(${productReviews.length})`}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="mt-6">
            {activeTab === 'description' && (
              <div className="bg-white border rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}
            
            {activeTab === 'features' && (
              <div className="bg-white border rounded-lg p-6">
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {productReviews.length > 0 ? (
                  productReviews.map((review) => (
                    <div key={review.id} className="bg-white border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-medium">{review.userName}</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {review.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="bg-white border rounded-lg p-6 text-center">
                    <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">KES {product.price}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}