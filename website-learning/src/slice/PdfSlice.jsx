import { createSlice } from "@reduxjs/toolkit";

const pdfSlice = createSlice({
  name: "pdf",
  initialState: {
    pdfUrl: null,
  },
  reducers: {
    setpdfUrl: (state, action) => {
      state.pdfUrl = action.payload;
    },
  },
});

export const { setpdfUrl } = pdfSlice.actions;
export default pdfSlice.reducer;
