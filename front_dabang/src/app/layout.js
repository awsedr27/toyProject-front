import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/layouts/Header.js'
import Navigator from './components/layouts/Navigator.js'
import SignUp from './signup/page'
import Page from "./page.js";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <body className={inter.className}>
      <Header/>
      <Navigator/>
      <Page/>
      </body>
      </html>
  );
}