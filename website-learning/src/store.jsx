import { configureStore } from "@reduxjs/toolkit";
import DataSlice from "./slice/DataSlice";

export const store = configureStore({
  reducer: {
    data: DataSlice,
  },
});