"use client"
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function BtnMultiLang({ locale, label }) {
  const { i18n } = useTranslation(); 

  const handleMultiLangClick = () => {
    i18n.changeLanguage(locale); 
  };

  return (
    <>
      <Button variant ="contained" onClick={handleMultiLangClick} style={{margin: '5px', backgroundColor:'#99ccff'}}>{label}</Button>
    </>
  );
}