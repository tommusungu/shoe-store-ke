'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Truck, Shield, Headphones } from 'lucide-react';
import { useAppSelector } from '@/hooks/useRedux';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/shared/ProductCard';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  const { filteredItems } = useAppSelector(state => state.products);
  const featuredProducts = filteredItems.slice(0, 4);
  const dealProduct = filteredItems.find(p => p.originalPrice);

  const categories = [
    {
      name: 'Men',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
      href: '/shop?category=men'
    },
    {
      name: 'Women',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
      href: '/shop?category=women'
    },
    {
      name: 'Kids',
      image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=300&fit=crop',
      href: '/shop?category=kids'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Amazing quality shoes! Fast delivery and excellent customer service.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c3ce?w=60&h=60&fit=crop&crop=face'
    },
    {
      name: 'Mike Chen',
      rating: 5,
      comment: 'Best online shoe store. Great selection and competitive prices.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face'
    },
    {
      name: 'Emma Davis',
      rating: 5,
      comment: 'Love the variety and quality. My go-to place for shoes!',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face'
    }
  ];

  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free delivery on orders over KES 100'
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: 'Your payment information is safe'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Customer support available anytime'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Start Shopping
                <span className="text-blue-600"> Now!</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Explore our curated collections and find the perfect shoes that speak to your style. Shop with confidence knowing you&apos;re getting quality and comfort.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/shop">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Shop Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <Image
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop"
                  alt="Featured Running Shoes"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">4.8/5</span>
                  </div>
                  <p className="text-sm text-gray-600">Customer Rating</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-3xl opacity-20 -rotate-6"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Explore Our Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our wide range of shoes for every occasion and style preference.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link href={category.href}>
                  <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="relative">
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deal of the Day Section */}
      {dealProduct && (
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Badge className="bg-red-500 text-white mb-4">
                  Limited Time Offer
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Deal of the Day
                </h2>
                <p className="text-xl mb-6 text-blue-100">
                  Don&apos;t miss out on this amazing deal! Limited time offer on premium footwear.
                </p>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-bold">KES {dealProduct.price}</span>
                  <span className="text-xl line-through text-blue-200">KES {dealProduct.originalPrice}</span>
                  <Badge className="bg-red-500">
                    {Math.round(((dealProduct.originalPrice! - dealProduct.price) / dealProduct.originalPrice!) * 100)}% OFF
                  </Badge>
                </div>
                {/* <Link href={`/product/${dealProduct.id}`}> */}
                <Link href={`/products`}>

                  <Button size="lg" variant="secondary">
                    Shop Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Image
                  src={dealProduct.image}
                  alt={dealProduct.name}
                  width={500}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked selection of our most popular and trending shoes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop">
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                View All Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                      <feature.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what our satisfied customers have to say.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4">&quot;{testimonial.comment}&quot;</p>
                    <div className="flex items-center space-x-3">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <span className="font-medium">{testimonial.name}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}