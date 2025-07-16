'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { useAppDispatch } from '@/hooks/useRedux';
import { setUser } from '@/lib/features/userSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock authentication - In a real app, this would be an API call
    if (credentials.email === 'admin@examplestore.com' && credentials.password === 'admin123') {
      const adminUser = {
        id: 'admin1',
        name: 'Admin User',
        email: credentials.email,
        isAdmin: true,
      };
      
      dispatch(setUser(adminUser));
      router.push('/admin/dashboard');
    } else {
      alert('Invalid credentials. Use admin@examplestore.com / admin123');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
              <p className="text-gray-600">Access the admin dashboard</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={credentials.email}
                    onChange={handleInputChange}
                    placeholder="admin@examplestore.com"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={credentials.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <LogIn className="w-4 h-4 mr-2" />
                  )}
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Demo Credentials:</h4>
                <p className="text-sm text-blue-700">
                  Email: admin@examplestore.com<br />
                  Password: admin123
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}