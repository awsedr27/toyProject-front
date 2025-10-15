// app/layout.js
import './globals.css';
import I18nextProvider from '../../util/I18nProvider';
import MyThemeProvider from '../../util/ThemeProvider';
import { Box } from '@mui/material';
import { LoadingProvider } from '@/context/LoadingContext'; 



export default function RootLayout({ children }) {

  return (
    <html>
      <body>
        <MyThemeProvider>
          <I18nextProvider>
            <LoadingProvider>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                  minHeight: '100vh',
                  margin: '0 auto',
                }}
                >
                {children}
              </Box>
            </LoadingProvider>
          </I18nextProvider>
        </MyThemeProvider>
      </body>
    </html>
  );
}