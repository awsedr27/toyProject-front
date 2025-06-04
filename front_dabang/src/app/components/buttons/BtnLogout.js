'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import { logoutClient } from '../function/FncAuthClient';

export default function BtnLogout({ isLoggedIn }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogoutClick = () => {
    setLoading(true);
    logoutClient();
    router.refresh(); 
    setLoading(false);
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