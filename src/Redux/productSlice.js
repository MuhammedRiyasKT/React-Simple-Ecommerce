import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Async thunk to fetch products
export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async () => {
    const result = await axios.get('https://dummyjson.com/products');
    return result.data.products;
  }
);

// Product slice
const productSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    error: '',
    loading: false,
  },
  reducers: {
      searchProducts : ((state, action)=>{
         state.allProducts = state.dummyProducts.filter(item => item.title.toLocaleLowerCase().includes(action.payload))
      })
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.allProducts = [];
        state.error = "";
        state.loading = true; 
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.allProducts = action.payload;
        state.dummyProducts = action.payload
        state.error = ""; 
        state.loading = false;
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.allProducts = [];
        state.error = "API call failed"; 
        state.loading = false;
      });
  },
});




export const {searchProducts} = productSlice.actions
export default productSlice.reducer;
