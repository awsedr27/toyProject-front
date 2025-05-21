import BtnLogin from "../../buttons/BtnLogin";
import BtnSingUp from "../../buttons/BtnSignUp";
import React, { useState } from 'react';

export default function LoginForm({ onClick }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleBtnClick = (e) => {
    e.preventDefault();
    onClick(email, password);  // 부모 컴포넌트에서 받은 onLogin 함수 호출
  };


    return (
        <div className="login-container">
      <h1>로그인</h1>
      <div className="login-form">
        <label htmlFor="email">이메일</label>
        <input type="email" id="email" name="email" required autoFocus onChange={(e) => setEmail(e.target.value)}/>

        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)}/>

        <BtnLogin onClick={handleBtnClick} isLoggedIn={false}></BtnLogin>
      </div>
      <p>
        아직 계정이 없으신가요? <BtnSingUp></BtnSingUp>
      </p>
    </div>
    );
}