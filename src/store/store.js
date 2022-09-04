import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "../store/features/category/categorySlice";

export const store = configureStore({
  reducer: {
    category: categorySlice,
  },
});
