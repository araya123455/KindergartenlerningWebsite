import { createSlice } from "@reduxjs/toolkit";

const pdfSlice = createSlice({
  name: "pdfMath",
  initialState: {
    pdfUrlMath: null,
  },
  reducers: {
    setpdfUrlMath: (state, action) => {
      state.pdfUrlMath = action.payload;
    },
  },
});

export const { setpdfUrlMath } = pdfSlice.actions;
export default pdfSlice.reducer;