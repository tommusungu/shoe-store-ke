import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import wishlistReducer from './features/wishlistSlice';
import productsReducer from './features/productsSlice';
import userReducer from './features/userSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    products: productsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;