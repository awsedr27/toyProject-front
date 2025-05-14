// app/signUp/layout.js
export const metadata = {
  title: '회원가입',
  description: '회원가입 페이지입니다.',
};

export default function SignUpLayout({ children }) {
  return(
    <html>
      <body>
        {children}
      </body>
    </html>
  ) ;
}