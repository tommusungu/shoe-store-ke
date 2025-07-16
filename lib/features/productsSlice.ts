import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';
import { mockProducts } from '@/data/mockData';

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  categories: string[];
  selectedCategory: string | null;
  searchQuery: string;
  loading: boolean;
}

const initialState: ProductsState = {
  items: mockProducts,
  filteredItems: mockProducts,
  categories: ['all', 'men', 'women', 'kids'],
  selectedCategory: 'all',
  searchQuery: '',
  loading: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
    },
    filterByCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      state.filteredItems = action.payload === 'all' 
        ? state.items 
        : state.items.filter(product => product.category === action.payload);
    },
    searchProducts: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      const query = action.payload.toLowerCase();
      state.filteredItems = state.items.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
      state.filteredItems = state.items;
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        state.filteredItems = state.items;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(p => p.id !== action.payload);
      state.filteredItems = state.items;
    },
  },
});

export const { 
  setProducts, 
  filterByCategory, 
  searchProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct 
} = productsSlice.actions;
export default productsSlice.reducer;