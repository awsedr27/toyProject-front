'use client';
import BtnLogout from '../../buttons/BtnLogout';
import Header from '@/app/components/layouts/Header.js';
import { CustomBox } from '@/styles/CommonStyles';
import MovieList from '@/app/components/layouts/forms/MovieList';

export default function UserHome({ handleLogin }) {
  return (
    <>
      <Header/>
      <CustomBox sx={{ textAlign:'center', width:'90%'}}>
        <h2>안녕하세요, 사용자님! 👋</h2>
        <MovieList/>
        <BtnLogout isLoggedIn={true} onSetLogin={handleLogin}></BtnLogout>
      </CustomBox>
    </>
  );
}