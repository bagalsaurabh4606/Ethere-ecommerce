import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    products: [],
  },
  reducers: {
    addInitialItems: (state, action) => {
      console.log("items slice",state.products)
      state.products = action.payload;
    },
  },
});

export const itemsAction = itemsSlice.actions;
export default itemsSlice;
