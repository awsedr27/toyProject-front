'use client';
import { useRouter } from 'next/navigation';

export default function BtnSingUp({ isLoggedIn }) {
  const router = useRouter();

  const handleSignupClick = () => {
    router.push('/signUp');
  };

  return (
    <>
      {isLoggedIn ? (
        null
      ) : (
        <>
          <button onClick={handleSignupClick}>회원가입</button>
        </>
      )}
    </>
  );
}