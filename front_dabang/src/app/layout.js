import './globals.css'
import I18nextProvider from '@/app/components/util/I18nProvider';


export default function RootLayout({ children }) {
  return (
    <html>
      <body>
          <I18nextProvider>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%',height:'100%', margin: '0 auto' ,backgroundColor:'lightgrey'}}>
              {children}
          </div>
          {/* <Footer/> */}
          </I18nextProvider>
      </body>
      </html>
  );
}