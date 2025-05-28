import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/layouts/Header.js'
import Navigator from './components/layouts/Navigator.js'
import Page from "./page.js";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth:'1200px', height:'100%', margin: '0 auto' ,backgroundColor:'lightgrey'}}>
            <div style={{ height:'15%', display: 'flex', alignItems: 'center', justifyContent: 'center',width:'100%' }}>
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