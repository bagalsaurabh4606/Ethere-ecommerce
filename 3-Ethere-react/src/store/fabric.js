import { createSlice } from "@reduxjs/toolkit";


const fabricSlice=createSlice(
  {
    name:'fabric',
    initialState:{
      products:[]
    },
    reducers:{
      addInitialItemsFabric:(state,action)=>{
        console.log("fabric items are f**",state,action);
         state.products= action.payload;
      }
    }
  }
)

export const fabricAction=fabricSlice.actions;
export default fabricSlice;

