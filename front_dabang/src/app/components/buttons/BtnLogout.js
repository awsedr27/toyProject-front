'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import { logoutClient } from '../function/FncAuthClient';

export default function BtnLogout({ isLoggedIn, onSetLogin }) {
  const router = useRouter();

  const handleLogoutClick = () => {
    logoutClient();
    onSetLogin(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <Button variant ="contained" onClick={handleLogoutClick}>로그아웃</Button>
      ) : (
        null
      )}
    </>
  );
}