import Spinner from '@src/components/Spinner/Spinner';
import Router from '@src/routes/indexRoutes';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@src/redux/store';

export default function App() {
  const {visible: visibleSpinner} = useSelector(
    (state: RootState) => state.spinner,
  );
  return (
    <>
      <Router />
      <Spinner show={visibleSpinner} />
    </>
  );
}
