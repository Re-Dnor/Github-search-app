import React from 'react';
import {
  Container, Avatar, LinearProgress, Typography, Box, ListItemText, ListItemButton, List, ListSubheader,
} from '@mui/material';
import { useSelector } from 'react-redux';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { RootState } from '../store/store';

function Profile() {
  const { currentUser, loader, reposList } = useSelector((state: RootState) => state.github);
  return (
    <div>
      {
        loader
          ? <LinearProgress />
          : (
            <Box sx={{ display: 'flex', margin: '0 auto' }} maxWidth="sm" component="main">
              <Container disableGutters maxWidth="sm" sx={{ pt: 8, pb: 6 }}>
                <Avatar
                  src={currentUser.avatar}
                  alt={`Image  ${currentUser.name}`}
                  sx={{ width: 250, height: 250 }}
                />
                <Container
                  component="span"
                  sx={{ marginTop: 2, paddingLeft: 0 }}
                >
                  <Typography
                    component="h5"
                    variant="h5"
                    align="left"
                    color="text.primary"
                  >
                    {currentUser.name}
                  </Typography>
                  <Typography
                    component="p"
                    variant="h6"
                    align="left"
                    color="text.secondary"
                  >
                    {currentUser.login}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PeopleOutlineIcon fontSize="small" />
                    <p style={{ marginLeft: 5, fontSize: 14 }}>
                      {currentUser.followers}
                      {' '}
                      Followers
                    </p>
                    <p style={{ marginLeft: 5, fontSize: 14 }}>
                      {currentUser.following}
                      {' '}
                      Following
                    </p>
                  </Box>
                </Container>
              </Container>
              <Container disableGutters maxWidth="sm" sx={{ pt: 8, pb: 6 }}>
                <List
                  sx={{
                    width: '100%',
                    bgcolor: 'background.primary',
                    overflow: 'auto',
                    maxHeight: 400,
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  subheader={(
                    <ListSubheader component="div" id="nested-list-subheader">
                      Repositories
                    </ListSubheader>
                )}
                >
                  {reposList.map((rep) => (
                    <ListItemButton key={rep.id} component="a" href={rep.url}>
                      <ListItemText primary={rep.name} />
                    </ListItemButton>
                  ))}
                </List>
              </Container>
            </Box>
          )
      }
    </div>
  );
}

export default Profile;
