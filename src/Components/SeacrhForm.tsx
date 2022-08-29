import React, { useState } from 'react';
import {
  CssBaseline, Box, Avatar, Container, Typography, TextField, Button, ButtonGroup,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '../store/github-slice';
import { AppDispatch } from '../store/store';

function SearchForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [inputSearch, setInputSearch] = useState('Re-Dnor');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(fetchUsers(inputSearch));
  };

  return (
    // <Autocomplete></Autocomplete>
    <Container component="main" maxWidth="xl">
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
          <TextField
            margin="normal"
            required
            id="search"
            label="Users"
            name="search"
            autoComplete="search"
            value={inputSearch}
            autoFocus
            onChange={handleChange}
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
      </Box>
    </Container>
  );
}

export default SearchForm;
