import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function GuardRoute({ children, ...rest }) {
  let { user } = useSelector((state) => state.auth);
  return user ? children : <Navigate to="/" />;
}
