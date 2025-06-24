// components/LoggedOutHome.js
'use client';

import LoginForm from '@/app/components/layouts/forms/LoginForm'; // 앞서 만든 LoginForm 컴포넌트 임포트
import SignupForm from '@/app/components/layouts/forms/SignupForm';
import React, { useEffect, useState, useRef } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import logo_SB from '@/../public/images/logo_SB.png'
import Trans from '@/app/components/common/Trans';
import BtnMultlLang from '@/app/components/buttons/BtnMultiLang';

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
          <Box style={{ padding: '10px', border: '1px solid #4C90FEFF', margin: '20px', backgroundColor: 'white', textAlign: 'center' , borderRadius: '90px',  flexShrink: 0}}>
            <Image src={logo_SB} alt="logo" width={'150'} height={'150'} />
          </Box>
           <Stack spacing={2} sx={{ flexGrow: 1 }}>
            <Box style={{ padding: '20px', border: '1px solid #4C90FEFF', margin: '20px', backgroundColor: 'white', textAlign: 'center' , borderRadius: '20px'}}>
              <Typography  variant="h4"><Trans tkey="LOGOUT.WELCOME" /></Typography>
              <br/>
              <Typography  variant="p"><Trans tkey={"LOGOUT.PLEASE_LOGIN"}/></Typography>
            </Box>
            {activeForm === 'L' ?(
                <Box style={{ padding: '20px', border: '1px solid #4C90FEFF', margin: '20px', backgroundColor: 'white', borderRadius: '20px', display:'flex'}}>
                    <LoginForm onSetLogin={handleSetLoginStatus} activeForm={handleActiveForm}/>
                </Box>
            ) : activeForm === 'S' ? (
                <Box style={{ padding: '20px', border: '1px solid #4C90FEFF', margin: '20px', backgroundColor: 'white', borderRadius: '20px', display:'flex'}}>
                    <SignupForm activeForm={handleActiveForm}/>
                </Box>
            ) :
                ''
            }
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}