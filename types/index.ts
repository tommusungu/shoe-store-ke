export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images:string[];
  category: 'men' | 'women' | 'kids';
  brand: string;
  sizes: number[];
  colors: string[];
  description: string;
  features: string[];
  inStock: boolean;
  featured: boolean;
  onSale: boolean;
  rating: number;
  reviews: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  paymentMethod: 'card' | 'mpesa';
  createdAt: string;
  deliveryAddress: {
    street: string;
    city: string;
    country: string;
    zipCode: string;
  };
}
export interface CartItem {
  product: Product;
  quantity: number;
  size: number;
  color: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  paymentMethod: 'card' | 'mpesa';
  shippingAddress: Address;
  createdAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}