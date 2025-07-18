"use client"
import { Box, Button, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import kr from '@/../public/images/icons/icon_KR_circle.png';
import en from '@/../public/images/icons/icon_UK_circle.png';

export default function BtnMultiLang() {
  const { i18n } = useTranslation(); 

  const handleMultiLangClick = (locale) => {
    i18n.changeLanguage(locale);
  };

  const languageButtonSx = (theme) => ({
    minWidth: 0, 
    width: 38,    
    height: 38,   
    borderRadius: '50%', 
    padding: 0,   
    margin: '0 5px 0 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background-color 0.3s ease', // 호버 시 부드러운 전환 효과
    '&:hover': {
      backgroundColor: theme.palette.primary.light, // 호버 시 나타날 배경색 (투명한 검정)
    },
  });
  return (
    <>
      <Box sx={{
                position: 'relative', 
                right: '10px',           
                zindex: '11',        
                display: 'flex', 
                marginbottom: '5px' }}>
          <Button onClick={() => handleMultiLangClick('kr')} sx={languageButtonSx} ><Image src={kr} alt={'한국어'} width={35} height={35} /></Button>
          <Button onClick={() => handleMultiLangClick('en')} sx={languageButtonSx} ><Image src={en} alt={'English'} width={35} height={35} /></Button>
      </Box>
    </>
  );
}