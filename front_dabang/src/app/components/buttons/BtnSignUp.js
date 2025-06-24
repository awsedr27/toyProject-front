'use client';
import React, { useState } from 'react';

import { Button, Modal, Box } from '@mui/material';


export default function BtnSingUp({ activeForm }) {

  const signupClick = () => {
    activeForm();
  }
  return (
    <>

      <Button variant="contained" color="primary" onClick={signupClick}>
        회원가입
      </Button>
    </>
  );
}