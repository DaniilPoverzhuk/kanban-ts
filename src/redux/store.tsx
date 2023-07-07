import { combineReducers, configureStore } from "@reduxjs/toolkit";

import BoardSlice from "./slices/BoardSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const RootReducer = combineReducers({ board: BoardSlice });

const store = configureStore({
  reducer: RootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
