import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  products: any;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  products: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<any>) => {
      state.products = action.payload;
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const product = state.products.find((item: any) => item.id === productId);
      if (product) {
        product.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const product = state.products.find((item: any) => item.id === productId);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (item: any) => item.id !== action.payload
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setProducts,
  incrementQuantity,
  decrementQuantity,
  deleteProduct,
  setLoading,
  setError,
} = cartSlice.actions;

export default cartSlice.reducer;
