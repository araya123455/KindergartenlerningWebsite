import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// Define the initial state
const initialState = {
  teacherData: [],
  studentData: [],
};

// Create async thunks to fetch data from the backend
export const fetchTeacherData = createAsyncThunk(
  "data/fetchTeacherData",
  async () => {
    const response = await fetch(`${import.meta.env.VITE_APP_API}/teacher`); // Replace "/api/teachers" with your actual backend API endpoint to fetch teacher data
    return await response.json();
  }
);

export const fetchStudentData = createAsyncThunk(
  "data/fetchStudentData",
  async () => {
    const response = await fetch(`${import.meta.env.VITE_APP_API}/student`); // Replace "/api/students" with your actual backend API endpoint to fetch student data
    return await response.json();
  }
);

// Create the data slice
const TchStuSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeacherData.fulfilled, (state, action) => {
        state.teacherData = action.payload;
      })
      .addCase(fetchStudentData.fulfilled, (state, action) => {
        state.studentData = action.payload;
      });
  },
});


export default TchStuSlice.reducer;
