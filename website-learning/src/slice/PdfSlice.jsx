import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pdfUrl: [],
};

const pdfSlice = createSlice({
  name: 'pdf',
  initialState,
  reducers: {
    setpdfUrl: (state, action) => {
      state.pdfUrl = action.payload;
    },
  },
});

export const { setpdfUrl } = pdfSlice.actions;
export default pdfSlice.reducer;