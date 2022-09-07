import React from 'react';
import { Redirect } from 'react-router-dom';

export const Forbidden = () => {
  return <Redirect to={'/'} />;
};
