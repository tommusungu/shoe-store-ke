'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  Plus, 
  Edit,
  Trash2,
  Eye,
  LogOut
} from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { logout } from '@/lib/features/userSlice';
import { deleteProduct } from '@/lib/features/productsSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function AdminDashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser, isAuthenticated } = useAppSelector(state => state.user);
  const { items: products } = useAppSelector(state => state.products);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !currentUser?.isAdmin) {
      router.push('/admin');
    }
  }, [isAuthenticated, currentUser, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/admin');
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(productId));
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    {
      title: 'Total Products',
      value: products.length,
      icon: Package,
      color: 'text-blue-600 bg-blue-100',
    },
    {
      title: 'Total Orders',
      value: '1,234',
      icon: ShoppingCart,
      color: 'text-green-600 bg-green-100',
    },
    {
      title: 'Total Customers',
      value: '5,678',
      icon: Users,
      color: 'text-purple-600 bg-purple-100',
    },
    {
      title: 'Revenue',
      value: 'KES 89,432',
      icon: DollarSign,
      color: 'text-orange-600 bg-orange-100',
    },
  ];

  if (!isAuthenticated || !currentUser?.isAdmin) {
    return null; // or loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Welcome back, {currentUser.name}
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Products Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Product Management</CardTitle>
                <Link href="/admin/products/create">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {/* Search */}
              <div className="mb-6">
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md"
                />
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-gray-500">{product.description.substring(0, 50)}...</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{product.brand}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{product.category}</Badge>
                        </TableCell>
                        <TableCell>KES {product.price}</TableCell>
                        <TableCell>
                          <Badge variant={product.inStock ? "default" : "destructive"}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Link href={`/products`}>
                              <Button variant="ghost" size="icon">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Link href={`/admin/products/edit/${product.id}`}>
                              <Button variant="ghost" size="icon">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-8">
                  <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No products found matching your search.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}