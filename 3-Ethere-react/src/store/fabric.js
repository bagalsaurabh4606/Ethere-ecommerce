import { createSlice } from "@reduxjs/toolkit";


const fabricSlice=createSlice(
  {
    name:'fabric',
    initialState:[],
    reducers:{
      addInitialItemsFabric:(state,action)=>{
        console.log("fabric items are f**",state,action);
         return action.payload;
      }
    }
  }
)

export const fabricAction=fabricSlice.actions;
export default fabricSlice;

