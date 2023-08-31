import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  classes: [],
  students: [],
  kinderRooms: [],
  yearTerms: [],
  searchResults: [],
};

export const fetchClasses = createAsyncThunk("data/fetchClasses", async () => {
  const response = await axios.get("/api/classes");
  return response.data;
});

export const fetchStudents = createAsyncThunk("data/fetchStudents", async () => {
  const response = await axios.get("/api/students");
  return response.data;
});

export const fetchKinderRooms = createAsyncThunk("data/fetchKinderRooms", async () => {
  const response = await axios.get("/api/kinderRooms");
  return response.data;
});

export const fetchYearTerms = createAsyncThunk("data/fetchYearTerms", async () => {
  const response = await axios.get("/api/yearTerms");
  return response.data;
});

export const searchClass = createAsyncThunk("data/searchClass", async ({ kinder_id, yearterm_id }) => {
  const response = await axios.get(`/searchstuclass/${kinder_id}?yearterm_id=${yearterm_id}`);
  return response.data;
});

const ClassSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.classes = action.payload;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.students = action.payload;
      })
      .addCase(fetchKinderRooms.fulfilled, (state, action) => {
        state.kinderRooms = action.payload;
      })
      .addCase(fetchYearTerms.fulfilled, (state, action) => {
        state.yearTerms = action.payload;
      })
      .addCase(searchClass.fulfilled, (state, action) => {
        state.searchResults = action.payload.data;
      });
  },
});

export default ClassSlice.reducer;