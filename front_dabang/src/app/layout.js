import './globals.css'
import I18nextProvider from '@/app/components/util/I18nProvider';
import { Box } from '@mui/material'; 

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
          <I18nextProvider>
          {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%',minHeight: '100vh', paddingTop: '250px', margin: '0 auto' ,backgroundColor:'lightgrey'}}> */}
          <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              minHeight: '100vh',
              margin: '0 auto',
              backgroundColor:'lightgrey',
              paddingTop: {
                xs: '250px',
                md: '20px'
              },
            }}
          >
              {children}
          </Box>
          {/* <Footer/> */}
          </I18nextProvider>
      </body>
      </html>
  );
}