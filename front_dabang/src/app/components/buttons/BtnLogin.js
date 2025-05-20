'use client';
import { useRouter } from 'next/navigation';

export default function BtnLogin({ isLoggedIn }) {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login'); 

  return (
    <>
      {isLoggedIn ? (
        null
      ) : (
        <>
          <button onClick={handleLoginClick}>로그인</button>
        </>
      )}
    </>
  );}
}