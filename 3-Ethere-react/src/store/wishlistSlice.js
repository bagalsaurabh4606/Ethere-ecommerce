import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState:[],
  reducers: {
    addToWishlist:(state,action)=>{
      console.log("got a state",state);
      // state.push(action.payload)
      return [...action.payload]
    },

    removeFromWishlist:(state,action)=>{
     
      return state.filter((itemId)=>itemId!==action.payload);
    },
  },
});

export const wishlistActions = wishlistSlice.actions;
export default wishlistSlice;
