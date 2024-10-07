import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishProducts: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.wishProducts = action.payload;
      } else {
        state.wishProducts = [...state.wishProducts, action.payload];
      }
    },

    removeFromWishlist: (state, action) => {
      const productId = action.payload; // The id of the product to be removed
      state.wishProducts = state.wishProducts.filter(
        (item) => item.id !== productId
      );
    },
  },
});

export const wishlistActions = wishlistSlice.actions;
export default wishlistSlice;
