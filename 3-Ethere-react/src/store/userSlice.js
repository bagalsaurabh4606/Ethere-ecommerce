import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState:{
    data:null
  },
  reducers: {
    setUserDetails:(state,action)=>{
      console.log("user details set ",action.payload)
      return action.payload
    },

  },
});

export const userActions = userSlice.actions;
export default userSlice;
