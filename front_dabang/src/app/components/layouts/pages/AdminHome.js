'use client'
import BtnLogout from '../../buttons/BtnLogout';
import Header from '@/app/components/layouts/Header.js'
import { CustomBox } from '@/styles/CommonStyles';

export default function AdminHome({ handleLogin }) {
  return (
    <>
      <Header/>
      <CustomBox sx={{ textAlign:'center'}}>
        <BtnLogout isLoggedIn={true} onSetLogin={handleLogin}></BtnLogout>
      </CustomBox>
    </>
  );
}