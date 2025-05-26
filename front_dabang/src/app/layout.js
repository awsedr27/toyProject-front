import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/layouts/Header.js'
import Navigator from './components/layouts/Navigator.js'
import SignUp from './signup/page'
import Page from "./page.js";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%', height:'100%', margin: '0 auto' ,backgroundColor:'Grey'}}>
            <div style={{ height:'15%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Header/>
            </div>
            <br/>
            <div style={{height:'85%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {children}
            </div>
          </div>
          {/* <Footer/> */}
      </body>
      </html>
  );
}