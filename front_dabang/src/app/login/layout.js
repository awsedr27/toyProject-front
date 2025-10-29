'use client'
import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import logo_typo from '@/../public/images/logo_typo.png'
import logo_popcorn from '@/../public/images/logo_popcorn.png'
import BtnMultlLang from '@/app/components/buttons/BtnMultiLang';
import { CustomBox } from '@/styles/CommonStyles';
import DarkModeToggle from '@/app/components/buttons/DarkModeToggle';

export default function LoginLayout({ children }) {
  return (
    <>
      <Stack direction="column" alignItems="center" sx={{ width: '100%', maxWidth: '1200px', margin: 'auto'}}>
        <Box sx={{ position: 'fixed', top: 16, right: 16, display: 'flex', gap: 1, zIndex: 1000 }}>
          <DarkModeToggle />
          <BtnMultlLang ></BtnMultlLang>
        </Box>
        <Stack  direction={{ xs: 'column', md: 'row' }} sx={{alignItems:'center'}} >
            <Image src={logo_popcorn} alt="logo" width={'450'} height={'450'} />
          <Stack spacing={2} sx={{ flexGrow: 1 , alignItems:'center'}} >
            <Image src={logo_typo} alt="logo_typo" width={'300'} height={'78'} />
            <CustomBox style={{ display:'flex'}}>
              {children}
            </CustomBox>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}