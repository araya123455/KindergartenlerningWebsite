
import { createSlice } from "@reduxjs/toolkit";

const pdfSlice = createSlice({
  name: "pdfEn",
  initialState: {
    pdfUrlEnhance: null,
  },
  reducers: {
    setpdfUrlEnhance: (state, action) => {
      state.pdfUrlEnhance = action.payload;
    },
  },
});

export const { setpdfUrlEnhance } = pdfSlice.actions;
export default pdfSlice.reducer;