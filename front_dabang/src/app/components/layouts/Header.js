'use client'
import Link from 'next/link';
import styles from './Header.module.css';
import BtnMultlLang from '../buttons/BtnMultiLang';
import Image from 'next/image';
import { Box, IconButton, useTheme } from '@mui/material'
import DarkModeToggle from '@/app/components/buttons/DarkModeToggle';


export default function Header() {
const theme = useTheme();
  return (
    <>
    <DarkModeToggle />
      <Box className={styles.upperHeaderContainer}>
        <BtnMultlLang></BtnMultlLang>
        <Link href="/mypage">
          <Image src="/images/Icons/user.png" alt="myPage" width={35} height={35}/>
        </Link>
      </Box>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>nunecine</div>
        </div>
      </header>
    </>
  );
}
