'use client'
import {useRouter} from 'next/navigation';
import { Button } from '@mui/material';


export default function BtnLogin({ isLoggedIn = false, onClick, isLoading=false}) {
  const router = useRouter();

  const handleLoginClick = async () => {
    if (onClick) {
      onClick(); 
    } else {
      // onClick prop이 제공되지 않았거나, 기타 조건 불충분 시 /login으로 이동
      router.push('/login');
    }
  }
  
  return (
    <>
       {isLoggedIn ? (
        null
      ) : (
        <>
          <Button variant ="contained" onClick={handleLoginClick}>로그인</Button>
        </>
      )} 
    </>
  );
}