import { createSlice } from "@reduxjs/toolkit";
const bagSlice = createSlice({
  name: "bag",
  initialState:[],
  reducers: {
    addToBag:(state,action)=>{
      console.log("item qantity in bag slice",action.payload)
      return action.payload
    },

    removeFromBag:(state,action)=>{
      return state.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.find(item => item.id === productId);
      if (existingItem) {
        existingItem.quantity = quantity; // Update the quantity directly
      }
    },
  },
});

export const bagActions = bagSlice.actions;
export default bagSlice;

