import { createSlice } from "@reduxjs/toolkit";


const categorySlice=createSlice(
  {
    name:'category',
    initialState:[],
    reducers:{
      addInitialItems:(state,action)=>{
        console.log(state,action);
         return action.payload;
      }
    }
  }
)

export const categoryAction=categorySlice.actions;
export default categorySlice;

