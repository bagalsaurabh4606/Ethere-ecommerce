import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./ItemsSlice";
import fetchItemSlice from "./fetchItemSlice";
import bagSlice from "./bagSlice";
import wishlistSlice from "./wishlistSlice";
import userSlice from "./userSlice";
import categorySlice from "./categorySlice";
import fabricSlice, { fabricAction } from "./fabric";


const ethereStore=configureStore(
  {
    reducer:{
      items:itemsSlice.reducer,
      fetchStatus:fetchItemSlice.reducer,
      bag:bagSlice.reducer,
      wishlist:wishlistSlice.reducer,
      user:userSlice.reducer,
      category:categorySlice.reducer,
      fabric:fabricSlice.reducer,
    }
  }
);

export default ethereStore;