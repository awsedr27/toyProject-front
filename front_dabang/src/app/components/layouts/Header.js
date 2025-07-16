'use client'
import Link from 'next/link';
import styles from './Header.module.css';
import BtnMultlLang from '../buttons/BtnMultiLang';


export default function Header() {
  return (
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
      <div className={styles.languageButtons}>
        <BtnMultlLang locale={"kr"} label={"한국어"}/>
        <BtnMultlLang locale={"en"} label={"English"}/> 
      </div>
    </header>
  );
}
