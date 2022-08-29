import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'github/fetchUsers',
  // if you type your function argument here
  async (user: string) => {
    const URL = 'https://api.github.com/';
    const response = await fetch(`${URL}search/users?q=${user}&per_page=20`);
    return response.json();
  },
);

export interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
};

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      console.log(state, action);
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      console.log(state, action);
    });
  },
});

export const { incrementByAmount } = githubSlice.actions;
export default githubSlice.reducer;
