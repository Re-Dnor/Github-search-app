import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Profile from './Profile';

function Info() {
  const { selected } = useSelector((state: RootState) => state.github);
  return (
    <div>
      {
      selected
      && (
        <Profile />
      )
      }
    </div>
  );
}

export default Info;
