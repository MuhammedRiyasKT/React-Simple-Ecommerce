import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: [],
  },
  reducers: {
    addWishlist: (state, action) => {
      const exists = state.wishlistItems.some(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        state.wishlistItems.push(action.payload);
      }
    },
    deleteWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { addWishlist, deleteWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
