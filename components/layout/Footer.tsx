import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Example Store</h3>
            <p className="text-gray-400 mb-4">
              Your trusted destination for premium footwear. Quality shoes for every lifestyle.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/shop" className="text-gray-400 hover:text-white transition-colors">Shop</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><Link href="/shop?category=men" className="text-gray-400 hover:text-white transition-colors">Men's Shoes</Link></li>
              <li><Link href="/shop?category=women" className="text-gray-400 hover:text-white transition-colors">Women's Shoes</Link></li>
              <li><Link href="/shop?category=kids" className="text-gray-400 hover:text-white transition-colors">Kids' Shoes</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-400">Phone: +2547 123-4567</span></li>
              <li><span className="text-gray-400">Email: support@examplestore.com</span></li>
              <li><span className="text-gray-400">Hours: Mon-Fri 9AM-6PM</span></li>
              <li><span className="text-gray-400">Free shipping on orders KES 10000+</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Example Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}