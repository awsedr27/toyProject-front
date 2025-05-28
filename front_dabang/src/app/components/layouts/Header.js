import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>MySite</div>
        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>Home</Link>
          <Link href="/about" className={styles.link}>About</Link>
          <Link href="/services" className={styles.link}>Services</Link>
          <Link href="/contact" className={styles.link}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}
