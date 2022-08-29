import { configureStore } from '@reduxjs/toolkit';
import githubReducer from './github-slice';

const store = configureStore({
  reducer: {
    github: githubReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
