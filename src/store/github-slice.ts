import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'github/fetchUsers',
  async (user: string) => {
    const URL = 'https://api.github.com/';
    const response = await fetch(`${URL}search/users?q=${user}&per_page=5`);
    return response.json();
  },
);

export const fetchCurrentUser = createAsyncThunk(
  'github/fetchCurrentUser',
  async (url: string) => {
    const response = await fetch(url);
    return response.json();
  },
);

interface IUser {
    login: string;
    url: string;
  }

interface ICurrentUser {
  name: string;
  login: string;
  bio: string;
  company: string;
  location: string;
  followers: string;
  following: string;
  avatar: string;
}

export interface GithubState {
  users: IUser[];
  selected: boolean;
  currentUser: ICurrentUser;
  loader: boolean;
  limit: boolean;
  errorMessage: string;
}

const initialState: GithubState = {
  users: [],
  selected: false,
  currentUser: {
    name: '',
    login: '',
    bio: '',
    company: '',
    location: '',
    followers: '',
    following: '',
    avatar: '',
  },
  loader: false,
  limit: false,
  errorMessage: '',
};

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    changeSelected: (state, action) => {
      state.selected = action.payload;
    },
    closeLimit: (state) => {
      state.limit = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      if (action.payload.message) {
        state.errorMessage = action.payload.message;
        state.limit = true;
      } else {
        (action.payload.items as any[]).forEach((item) => {
          const { login, url } = item;
          const newUser: IUser = {
            login,
            url,
          };

          state.users.push(newUser);
        });
        state.limit = false;
        state.errorMessage = '';
      }
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      console.log('___ERRROR');
      console.log(state, action.payload);
    });
    // _____FETCH CURRENT USER_____
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      console.log(action.payload);
      const {
        location, followers, following, name, login, bio, company,
      } = action.payload;
      const avatar = action.payload.avatar_url;
      const currentUser: ICurrentUser = {
        name,
        login,
        bio,
        company,
        location,
        followers,
        following,
        avatar,
      };
      state.currentUser = currentUser;
      state.loader = false;
      state.users = [];
    });
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      console.log('___ERRROR');
      console.log(state, action.payload);
    });
  },
});

export const { changeSelected, closeLimit } = githubSlice.actions;
export default githubSlice.reducer;
