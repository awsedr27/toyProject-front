'use client'
import Link from 'next/link';
import styles from './Header.module.css';
import BtnMultlLang from '../buttons/BtnMultiLang';
import { Box } from '@mui/material'


export default function Header() {
  return (
    <>
      <Box className={styles.upperHeaderContainer}>
        <BtnMultlLang></BtnMultlLang>
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
