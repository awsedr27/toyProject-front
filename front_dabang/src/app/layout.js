import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/layouts/Header.js'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%', margin: '0 auto' ,backgroundColor:'lightgrey'}}>
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