'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  const orderNumber = 'EX' + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            Order Confirmed!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 mb-8"
          >
            Thank you for your purchase. Your order has been successfully placed and will be processed shortly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-gray-600">Order Number:</span>
                    <span className="font-mono font-semibold text-blue-600">#{orderNumber}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Confirmation Email</p>
                        <p className="text-sm text-gray-500">Sent to your email address</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Package className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Processing Time</p>
                        <p className="text-sm text-gray-500">1-2 business days</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <Link href="/shop">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Continue Shopping
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            
            <p className="text-sm text-gray-500">
              Questions about your order? <Link href="/contact" className="text-blue-600 hover:underline">Contact us</Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}