import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Profile from './Profile';
import Welcome from './Welcome';

function Info() {
  const { selected } = useSelector((state: RootState) => state.users);
  return (
    <div>
      {
      selected
        ? <Profile />
        : <Welcome />
      }
    </div>
  );
}

export default Info;
