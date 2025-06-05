// components/LoggedOutHome.js
'use client';

import LoginForm from '@/app/components/layouts/forms/LoginForm'; // 앞서 만든 LoginForm 컴포넌트 임포트
import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import logo_SB from '@/app/components/images/logo_SB.png'
export default function LoggedOutHome({handleLogin}) {

  const handleSetLoginStatus = (status) =>{
    handleLogin(status);
  }


  return (
    <>
      <Stack  direction="row"  alignItems="center" >
        <Box style={{ padding: '10px', border: '1px solid #4C90FEFF', margin: '20px', backgroundColor: 'white', textAlign: 'center' , borderRadius: '90px'}}>
          <Image src={logo_SB} alt="logo" width={'150'} height={'150'} />
        </Box>
        <Stack>
          <Box style={{ padding: '20px', border: '1px solid #4C90FEFF', margin: '20px', backgroundColor: 'white', textAlign: 'center' , borderRadius: '20px'}}>
            <Typography  variant="h4">환영합니다!</Typography>
            <br/>
            <Typography  variant="p">서비스를 이용하려면 로그인해주세요.</Typography>
          </Box>
          <Box style={{ padding: '20px', border: '1px solid #4C90FEFF', margin: '20px', backgroundColor: 'white', borderRadius: '20px', display:'flex'}}>
            <LoginForm onSetLogin={handleSetLoginStatus}/> 
          </Box>
        </Stack>
      </Stack>
    </>
  );
}