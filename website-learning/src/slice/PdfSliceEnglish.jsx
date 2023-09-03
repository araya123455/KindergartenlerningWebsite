import { createSlice } from "@reduxjs/toolkit";

const pdfSlice = createSlice({
  name: "pdf",
  initialState: {
    pdfUrlEnglish: null,
  },
  reducers: {
    setpdfUrlEnglish: (state, action) => {
      state.pdfUrlEnglish = action.payload;
    },
  },
});

export const { setpdfUrlEnglish } = pdfSlice.actions;
export default pdfSlice.reducer;
