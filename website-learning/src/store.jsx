import { configureStore } from "@reduxjs/toolkit";
import DataSlice from "./slice/DataSlice";
import UserSlice from "./slice/userSlice";
import dataReducer from "./slice/TchStuSlice";
import searchReducer from "./slice/searchSlice";
import studentReducer from "./slice/StudentSlice"; // Update the path as needed
import PdfSlice from "./slice/PdfSlice";
import PdfSliceEnglish from "./slice/PdfSliceEnglish";
import PdfSliceEnhance from "./slice/PdfSliceEnhance";
import PdfSliceMath from "./slice/PdfSliceMath";
import PdfSliceThai from "./slice/PdfSliceThai";

export const store = configureStore({
  reducer: {
    data: DataSlice,
    user: UserSlice,
    data: dataReducer,
    search: searchReducer,
    student: studentReducer,
    pdff: PdfSlice,
    pdf: PdfSliceEnglish,
    pdfEn: PdfSliceEnhance,
    pdfMath: PdfSliceMath,
    pdfThai: PdfSliceThai,
  },
});