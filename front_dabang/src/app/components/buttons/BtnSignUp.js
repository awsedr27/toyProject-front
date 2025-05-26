'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

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
          <Button variant="contained" onClick={handleSignupClick}>회원가입</Button>
        </>
      )}
    </>
  );
}