'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import Trans from '@/app/components/common/Trans';


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
          <Button variant="contained" onClick={handleSignupClick}><Trans tkey={"BTN.SIGN_UP"}/></Button>
        </>
      )}
    </>
  );
}