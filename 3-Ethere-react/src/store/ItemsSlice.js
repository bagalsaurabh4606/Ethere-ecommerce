import { createSlice } from "@reduxjs/toolkit";


const itemsSlice=createSlice(
  {
    name:'items',
    initialState:{
     products: [],
    },
    reducers:{
      addInitialItems:(state,action)=>{
        //  return action.payload;
        console.log("item slice",action.payload)
        state.products= action.payload;

      }
    }
  }
)

export const itemsAction=itemsSlice.actions;
export default itemsSlice;

