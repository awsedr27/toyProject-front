// components/LoggedOutHome.js
'use client';

import LoginForm from '@/app/login/LoginForm'; // 앞서 만든 LoginForm 컴포넌트 임포트
import SignupForm from '@/app/components/layouts/forms/SignupForm';
import React, { useEffect, useState, useRef } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import logo_typo from '@/../public/images/logo_typo.png'
import Trans from '@/app/components/common/Trans';
import BtnMultlLang from '@/app/components/buttons/BtnMultiLang';
import { CustomBox } from '@/styles/CommonStyles';

export default function LoggedOutHome({handleLogin}) {
  const [activeForm, setActiveForm] = useState('L');
  const handleSetLoginStatus = (status) =>{
    handleLogin(status);
  }

  const handleActiveForm = (form) => {
      // Loginf = L  , Signup = S;
      setActiveForm(form);
  }

  return (
    <>
      <Stack direction="column" alignItems="center" sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
          <Box className={"languageButtons"}>
            <BtnMultlLang locale={"kr"} label={"한국어"}/>
            <BtnMultlLang locale={"en"} label={"English"}/> 
          </Box>
        <Stack  direction={{ xs: 'column', md: 'row' }}  alignItems={{ xs: 'center', md: 'flex-start' }}  style={{top:'30px'}} >
          <CustomBox sx={{ padding: '10px', textAlign: 'center' , borderRadius: '90px',  flexShrink: 0}}>
            <Image src={logo_typo} alt="logo" width={'150'} height={'150'} />
          </CustomBox>
           <Stack spacing={2} sx={{ flexGrow: 1 }}>
            <CustomBox>
              <Typography  variant="h4"><Trans tkey="LOGOUT.WELCOME" /></Typography>
              <br/>
              <Typography  variant="p"><Trans tkey={"LOGOUT.PLEASE_LOGIN"}/></Typography>
            </CustomBox>
            {activeForm === 'L' ?(
                <CustomBox style={{ display:'flex'}}>
                    <LoginForm onSetLogin={handleSetLoginStatus} activeForm={handleActiveForm}/>
                </CustomBox>
            ) : activeForm === 'S' ? (
                <CustomBox style={{ display:'flex'}}>
                    <SignupForm activeForm={handleActiveForm}/>
                </CustomBox>
            ) :
                ''
            }
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}