import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// กำหนดเป็นอะไรก็ได้
const initialState = {
  test: 0,
  data: [],
};

export const teacherlogin = createAsyncThunk("teacherlogin", async (body) => {
  console.log(body);
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API}/teacher/login`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
});

export const adminlogin = createAsyncThunk("adminlogin", async (body) => {
  console.log(body);
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API}/admin/login`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
});

export const studentlogin = createAsyncThunk("studentlogin", async (body) => {
  console.log(body);
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API}/student/login`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
});

export const register = createAsyncThunk("register", async (body) => {
  console.log(body);
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API}/register`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
});

export const dataTableSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    decrement: (state) => {
      state.value -= 1;
    },
  },
  extraReducers: {
  },
    //   adminlogin
    [adminlogin.pending]: (state) => {
      state.loading = true;
      state.error = "";
    },
    [adminlogin.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [adminlogin.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    //   teacherlogin
    [teacherlogin.pending]: (state) => {
      state.loading = true;
      state.error = "";
    },
    [teacherlogin.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [teacherlogin.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    //   studentlogin
    [studentlogin.pending]: (state) => {
      state.loading = true;
      state.error = "";
    },
    [studentlogin.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [studentlogin.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    //   register
    [register.pending]: (state) => {
      state.loading = true;
      state.error = "";
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
});

// Action creators are generated for each case reducer function
export const { SET_VALUE } = dataTableSlice.actions;

export default dataTableSlice.reducer;
