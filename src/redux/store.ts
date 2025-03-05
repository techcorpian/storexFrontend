import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import folderReducer from "./slices/folderSlice";
import projectReducer from "./slices/projectSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    folders: folderReducer,
    projects: projectReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;