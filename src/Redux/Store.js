import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import wishlistSlice from "./wishlistSlice";
import cartSlice from "./cartSlice"

const Store = configureStore({
  reducer: {
    productReducer: productSlice,
    wishlistReducer: wishlistSlice,
    cartReducer: cartSlice,
  },
});

export default Store;
