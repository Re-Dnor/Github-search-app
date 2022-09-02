import React, { useState, useEffect } from 'react';
import {
  CssBaseline, Box, Avatar, Typography, TextField, Button, ButtonGroup, Autocomplete, Dialog, DialogTitle,
  DialogContent, DialogContentText, DialogActions,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsers, fetchCurrentUser, changeSelected, closeLimit, fetchCurrentRepos,
} from '../store/github-slice';
import { AppDispatch, RootState } from '../store/store';
import useDebounce from '../hooks/useDebounce';

function SearchForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [inputSearch, setInputSearch] = useState('');
  const debounceSearch = useDebounce(inputSearch, 400);
  const { users, limit, errorMessage } = useSelector((state: RootState) => state.github);
  const usersName = users.map((user) => user.login);

  const handleChange = (event: React.SyntheticEvent<Element, Event>, inputValue: string | null): void => {
    if (inputValue) {
      setInputSearch(inputValue);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (inputSearch) {
      const { repos, url } = users.filter((user) => user.login === inputSearch)[0];
      dispatch(changeSelected(true));
      dispatch(fetchCurrentUser(url));
      dispatch(fetchCurrentRepos(repos));
    }
  };

  useEffect(() => {
    if (inputSearch) {
      dispatch(fetchUsers(debounceSearch));
    }
  }, [debounceSearch]);

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{
          m: 1, bgcolor: 'primary.main',
        }}
        >
          <GitHubIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Github Search
        </Typography>
        <ButtonGroup
          fullWidth
          sx={{ justifyContent: 'center' }}
          component="form"
          onSubmit={handleSubmit}
        >
          <Autocomplete
            id="combo-box-demo"
            value={inputSearch || null}
            onChange={handleChange}
            inputValue={inputSearch}
            onInputChange={(event, newInputValue) => {
              setInputSearch(newInputValue);
            }}
            options={usersName}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                margin="normal"
                autoFocus
                label="Select user"
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth={false}
            sx={{
              mt: 3, mb: 2, ml: 2,
            }}
          >
            Click
          </Button>
        </ButtonGroup>
        <Dialog
          open={limit}
          onClose={() => dispatch(closeLimit())}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            API limit
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {errorMessage}
              {' '}
              Wait a few minutes.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => dispatch(closeLimit())}>Ok</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default SearchForm;
