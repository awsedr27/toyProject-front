'use client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/layouts/Header';
// import Footer from './components/layouts/Footer';
import './globals.css';
import { Height } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider theme={theme}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%', height:'100%', margin: '0 auto' ,backgroundColor:'Green'}}>
            <div style={{ height:'15%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Header/>
            </div>
            <br/>
            <div style={{height:'85%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {children}
            </div>
          </div>
          {/* <Footer/> */}
        </ThemeProvider>
      </body>
    </html>
  );
}