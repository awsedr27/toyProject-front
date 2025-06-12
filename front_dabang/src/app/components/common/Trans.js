import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Trans({ tkey }) {
  const { t } = useTranslation(); 
  return <>{t(tkey)}</>;
}