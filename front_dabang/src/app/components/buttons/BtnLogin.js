'use client'
import {useRouter} from 'next/navigation';
import { Button } from '@mui/material';
import {login} from '../function/FncLogin';


export default function BtnLogin({ isLoggedIn, loginData }) {
  const router = useRouter();

  const handleLoginClick = async () => {
    const email = loginData.email;
    const password = loginData.password;
    if (!isLoggedIn && email != '' && password != '') {
      login(loginData);
    }else{
      router.push('/login'); 
    }

  return (
    <>
      {/* {isLoggedIn ? (
        null
      ) : (
        <>
          <Button variant ="contained" onClick={handleLoginClick}>로그인</Button>
        </>
      )} */}
      <Button>나리나리</Button>
      <Button variant ="contained" onClick={handleLoginClick}>로그인</Button>
    </>
  );}
}