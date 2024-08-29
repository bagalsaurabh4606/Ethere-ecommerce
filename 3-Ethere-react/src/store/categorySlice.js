import { createSlice } from "@reduxjs/toolkit";


const categorySlice=createSlice(
  {
    name:'category',
    initialState:[],
    reducers:{
      addInitialItems:(state,action)=>{
        console.log("adkjfsfjsjfsfjsfjsfj",action.payload)
         return action.payload;
      }
    }
  }
)

export const categoryAction=categorySlice.actions;
export default categorySlice;

