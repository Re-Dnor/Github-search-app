import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users-slice';
import reposReducer from './repos-slice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    repos: reposReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
