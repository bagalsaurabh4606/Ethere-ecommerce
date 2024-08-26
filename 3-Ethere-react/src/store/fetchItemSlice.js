import { createSlice } from "@reduxjs/toolkit";

const fetchItemSlice=createSlice(
  {
    name:'fetchStatus',
    initialState:{
      fetchDone:false,
      currentFetching:false,
    },
    reducers:{
        markFetchingstarted:(state)=>{
         state.currentFetching=true;
      },
      markFetchingDone:(state)=>{
        state.fetchDone=true;
      },
      markFetchingFinished:(state)=>{
        state.currentFetching=false;
      }

    }
  }
)
export const fetchActions=fetchItemSlice.actions;
export default fetchItemSlice;