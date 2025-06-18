'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Modal, Box } from '@mui/material';
import SignupForm from '@/app/components/layouts/forms/SignupForm';

export default function BtnSingUp({ isLoggedIn }) {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);
  const handleSignupClick = () => {
  };
  const signupOpen = () => {setIsClicked(true);}
  const signupClose = () => {setIsClicked(false);}

  return (
    <>
      <Button variant="contained" color="primary" onClick={signupOpen}>
        회원가입
      </Button>
      {isClicked && (
          <div style={{ marginTop: '20px' }}>
            <SignupForm onClose={signupClose} />
          </div>
      )}
    </>
  );
}