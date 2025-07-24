'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Modal, Box } from '@mui/material';
import Trans from '../common/Trans';

export default function BtnSingUp({ activeForm }) {
    const router = useRouter();
  const signupClick = () => {
    //activeForm();
      router.push("signup");
  }
  return (
    <>
          <Button variant="contained" color="primary" onClick={signupClick}>
            <Trans tkey={"BTN.SIGN_UP"}/>
          </Button>
    </>
  );
}