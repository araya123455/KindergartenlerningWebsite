import { configureStore } from "@reduxjs/toolkit";
import DataSlice from "./slice/DataSlice";
import UserSlice from "./slice/userSlice";
import dataReducer from "./slice/TchStuSlice";
import searchReducer from "./slice/searchSlice";
import studentReducer from "./slice/StudentSlice"; // Update the path as needed
import PdfSlice from "./slice/PdfSlice";
import PdfSliceEnglish from "./slice/PdfSliceEnglish";


export const store = configureStore({
  reducer: {
    data: DataSlice,
    user: UserSlice,
    data: dataReducer,
    search: searchReducer,
    student: studentReducer,
    pdf: PdfSlice,
    pdf: PdfSliceEnglish,
  },
});