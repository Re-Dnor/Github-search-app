import React from 'react';
import { Container } from '@mui/material';

function Welcome() {
  return (
    <Container
      sx={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh',
      }}
    >
      <h3>Find the user of interest</h3>
    </Container>
  );
}

export default Welcome;
