import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    products: [],
  },
  reducers: {
    addInitialItems: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const itemsAction = itemsSlice.actions;
export default itemsSlice;
