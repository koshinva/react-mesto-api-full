import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

function Layout({ userEmail, loggedIn, handleSignOut }) {
  return (
    <>
      <Header userEmail={userEmail} loggedIn={loggedIn} handleSignOut={handleSignOut} />
      <Outlet />
    </>
  );
}

export default Layout;
