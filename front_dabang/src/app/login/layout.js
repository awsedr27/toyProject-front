'use client'
import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import logo_typo from '@/../public/images/logo_typo.png'
import logo_popcorn from '@/../public/images/logo_popcorn.png'
import BtnMultlLang from '@/app/components/buttons/BtnMultiLang';
import { CustomBox } from '@/styles/CommonStyles';

export default function LoginLayout({ children }) {
  return (
    <>
      <Stack direction="column" alignItems="center" sx={{ width: '100%', maxWidth: '1200px', margin: 'auto' }}>
        <BtnMultlLang></BtnMultlLang>
        <Stack  direction={{ xs: 'column', md: 'row' }} >
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