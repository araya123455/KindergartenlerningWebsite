import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async action
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  // Perform async operation here, such as fetching user data from an API
  const response = await fetch("https://example.com/api/user");
  const data = await response.json();
  return data;
});

const initialState = {
  adm_user: "",
  tch_user: "",
  stu_user: "",
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    LOGIN: (state, action) => {
      state.adm_user = action.payload.adm_user;
      state.tch_user = action.payload.tch_user;
      state.stu_user = action.payload.stu_user;
    },
    LOGOUT: (state, action) => {
      state.adm_user = "";
      state.tch_user = "";
      state.stu_user = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      // Handle the fulfilled action here
      state.adm_user = action.payload.adm_user;
      state.tch_user = action.payload.tch_user;
      state.stu_user = action.payload.stu_user;
    });
  },
});

// Action creators
export const { LOGIN, LOGOUT } = userSlice.actions;

// Reducer
export default userSlice.reducer;
