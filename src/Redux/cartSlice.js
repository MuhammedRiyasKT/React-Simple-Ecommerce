import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addCartItem: (state, action) => {
      const existingProduct = state.find((item) => item.id === action.payload.id);

      if (existingProduct) {
        // Update quantity and totalPrice
        existingProduct.quantity++;
        existingProduct.totalPrice = existingProduct.quantity * existingProduct.price;
      } else {
        // Add new product with initial quantity and totalPrice
        state.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price,
        });
      }
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingProduct = state.find((item) => item.id === id);

      if (existingProduct) {
        // Update the quantity and totalPrice
        existingProduct.quantity = quantity;
        existingProduct.totalPrice = existingProduct.price * quantity;
      }
    },
    deleteCart: (state, action) => {
      return state.filter((item)=> item.id !== action.payload)
    },
    clearCart: (state) => {
      return []; // Reset cart to an empty array
    },    
  },
});

export const { addCartItem, updateQuantity, deleteCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
