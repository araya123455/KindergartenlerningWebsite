import { createSlice } from "@reduxjs/toolkit";

const pdfSlice = createSlice({
  name: "pdfThai",
  initialState: {
    pdfUrlThai: null,
  },
  reducers: {
    setpdfUrlThai: (state, action) => {
      state.pdfUrlThai = action.payload;
    },
  },
});

export const { setpdfUrlThai } = pdfSlice.actions;
export default pdfSlice.reducer;