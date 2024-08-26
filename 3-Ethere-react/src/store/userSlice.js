import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState:{
    data:{}
  },
  reducers: {
    setUserDetails:(state,action)=>{
      return action.payload
    },

  },
});

export const userActions = userSlice.actions;
export default userSlice;
