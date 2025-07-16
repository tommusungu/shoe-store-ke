import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  total: number;
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  total: 0,
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; size: number; color: string }>) => {
      const { product, size, color } = action.payload;
      const existingItem = state.items.find(
        item => item.product.id === product.id && item.size === size && item.color === color
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product, quantity: 1, size, color });
      }

      state.total = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.product.id !== action.payload);
      state.total = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.product.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter(i => i.product.id !== action.payload.id);
        }
      }
      state.total = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleCart } = cartSlice.actions;
export default cartSlice.reducer;