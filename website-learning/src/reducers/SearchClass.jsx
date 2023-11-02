import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../slice/axiosInstance";

export const searchstuclass = createAsyncThunk(
  "search/searchstuclass",
  async ({ kinder_id, yearterm_id }, { rejectWithValue }) => {
    try {
      const response = await axios.get("/searchstuclass", {
        params: { kinder_id, yearterm_id },
      });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchstuclass.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(searchstuclass.rejected, (state, action) => {
        console.error("Error:", action.payload);
        return [];
      });
  },
});

export default searchSlice.reducer;
