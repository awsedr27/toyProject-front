// components/LoggedInHome.js
'use client';
import BtnLogout from '../../buttons/BtnLogout';
import RainbowHearts from '../../icons/RainbowHearts';
export default function LoggedInHome({ user }) {


  return (
    <div style={{ padding: '20px', border: '1px solid green', margin: '20px', backgroundColor: '#e6ffe6' , borderRadius: '20px', textAlign:'center'}}>
      <h2>안녕하세요, {user?.name || '사용자'}님! 👋</h2>
      <p>로그인 컨텐츠 영역</p>
      <RainbowHearts></RainbowHearts>
      <BtnLogout isLoggedIn={true}></BtnLogout>
    </div>
  );
}