import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCurrentRepos = createAsyncThunk(
  'github/fetchCurrentRepos',
  async (url: string) => {
    const response = await fetch(url);
    return response.json();
  },
);

interface IRepos {
  name: string;
  url: string;
  data: string;
  id: number;
}

interface IReposState {
  reposList: IRepos[];
  loader: boolean
}

const initialState: IReposState = {
  reposList: [],
  loader: false,
};

export const reposSlice = createSlice({
  name: 'github',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    // _____FETCH CURRENT REPOS ____
    builder.addCase(fetchCurrentRepos.pending, (state) => {
      state.loader = true;
      state.reposList = [];
    });
    builder.addCase(fetchCurrentRepos.fulfilled, (state, action) => {
      (action.payload as any[]).forEach((rep) => {
        const data = rep.pushed_at;
        const url = rep.html_url;
        const { name, id } = rep;

        const repItem = {
          data,
          url,
          name,
          id,
        };

        state.reposList.push(repItem);
        state.loader = false;
      });
    });
    builder.addCase(fetchCurrentRepos.rejected, (state, action) => {
      console.log('___ERRROR');
      console.log(state, action.payload);
    });
  },
});

// export const {} = reposSlice.actions;
export default reposSlice.reducer;
