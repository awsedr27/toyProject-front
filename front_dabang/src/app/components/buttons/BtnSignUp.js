'use client';
import React, { useState } from 'react';
import { Button, Modal, Box } from '@mui/material';
import Trans from '../common/Trans';

export default function BtnSingUp({ activeForm }) {

  const signupClick = () => {
    activeForm();
  }
  return (
    <>

      <Button variant="contained" color="primary" onClick={signupClick}>
        <Trans tkey={"BTN.SIGN_UP"}/>
      </Button>
    </>
  );
}