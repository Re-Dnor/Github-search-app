import React from 'react';
import {
  Container, Avatar, LinearProgress, Typography, Box,
} from '@mui/material';
import { useSelector } from 'react-redux';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { RootState } from '../store/store';

function Profile() {
  const { currentUser, loader } = useSelector((state: RootState) => state.github);
  return (
    <div>
      {
        loader
          ? <LinearProgress />
          : (
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
              <Avatar
                src={currentUser.avatar}
                alt={`Image  ${currentUser.name}`}
                sx={{ width: 250, height: 250 }}
              />
              <Container
                component="span"
                disableGutters
                sx={{ marginTop: 2, paddingLeft: 0 }}
              >
                <Typography
                  component="h4"
                  variant="h4"
                  align="left"
                  color="text.primary"
                  gutterBottom
                >
                  {currentUser.name}
                </Typography>
                <Typography
                  component="h5"
                  variant="h5"
                  align="left"
                  color="text.secondary"
                  gutterBottom
                >
                  {currentUser.login}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PeopleOutlineIcon fontSize="small" />
                  <p style={{ marginLeft: 10, fontSize: 14 }}>
                    {currentUser.followers}
                    {' '}
                    Followers
                  </p>
                  <p style={{ marginLeft: 10, fontSize: 14 }}>
                    {currentUser.following}
                    {' '}
                    Following
                  </p>
                </Box>

              </Container>
            </Container>
          )
      }
    </div>
  );
}

export default Profile;
