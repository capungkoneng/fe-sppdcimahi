import { combineReducers, configureStore } from "@reduxjs/toolkit";
import RootSlice from "./reducers";

export const store = configureStore({
    reducer: combineReducers({root: RootSlice})
});