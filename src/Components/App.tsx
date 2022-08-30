import React from 'react';
import { Container } from '@mui/material';

import SearchForm from './SeacrhForm';
import Info from './Info';

function App() {
  return (
    <Container component="main" maxWidth="xl">
      <SearchForm />
      <Info />
    </Container>
  );
}

export default App;
