import { createSlice } from "@reduxjs/toolkit";
const bagSlice = createSlice({
  name: "bag",
  initialState: {
    bagProducts: [],
  },
  reducers: {
    addToBag: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.bagProducts = action.payload;
      } else {
        state.bagProducts = [...state.bagProducts, action.payload];
      }
    },

    removeFromBag: (state, action) => {
      const productId = action.payload; // The id of the product to be removed
      state.bagProducts = state.bagProducts.filter(
        (item) => item.id !== productId
      );
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.bagProducts.find(
        (item) => item.id === productId
      );
      if (existingItem) {
        existingItem.quantity = quantity; // Update the quantity
      }
    },
  },
});

export const bagActions = bagSlice.actions;
export default bagSlice;
