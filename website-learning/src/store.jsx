import { configureStore } from "@reduxjs/toolkit";
import DataSlice from "./slice/DataSlice";
import UserSlice from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    data: DataSlice,
    user: UserSlice,
  },
});