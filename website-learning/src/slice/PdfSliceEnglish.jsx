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

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   pdfUrl: [],
// };

// const PdfSliceEnglish = createSlice({
//   name: 'pdfEnglish',
//   initialState,
//   reducers: {
//     setpdfUrl: (state, action) => {
//       state.pdfUrl = action.payload;
//     },
//   },
// });

// export const { setpdfUrlEnglish } = PdfSliceEnglish.actions;
// export default PdfSliceEnglish.reducer;