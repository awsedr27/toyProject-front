'use client'
import Link from 'next/link';
import styles from './Header.module.css';
import BtnMultlLang from '../buttons/BtnMultiLang';
import Image from 'next/image';
import { Box, IconButton, useTheme } from '@mui/material'


export default function Header() {
const theme = useTheme();
  return (
    <>
      <Box className={styles.upperHeaderContainer}>
        <BtnMultlLang></BtnMultlLang>
        <Link href="/mypage">
          <Image src="/images/Icons/user.png" alt="myPage" width={35} height={35}/>
        </Link>
      </Box>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>nunecine</div>
          <nav className={styles.nav}>
            <Link href="/main" className={styles.link}>Main</Link>
            <Link href="/about" className={styles.link}>About</Link>
            <Link href="/services" className={styles.link}>Services</Link>
            <Link href="/contact" className={styles.link}>Contact</Link>
          </nav>
        </div>
      </header>
    </>
  );
}
