'use client'
import React, { useState } from 'react';
import BtnLogin from "../../buttons/BtnLogin";
import BtnSingUp from "../../buttons/BtnSignUp";
import { TextField } from '@mui/material';

export default function LoginForm() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

   const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
      <div className="login-container">
    <h1>로그인</h1>
    <div className="login-form">
      <ul>
                  <li>
            {/* 이메일 필드를 MUI TextField로 변경 */}
            <TextField
              id="email"
              name="email"
              label="이메일" // label prop 사용
              variant="outlined"
              type="email"
              value={loginData.email}
              onChange={handleChange}
              required
              autoFocus
            />
          </li>
          <li>
            {/* 비밀번호 필드를 MUI TextField로 변경 */}
            <TextField
              id="password"
              name="password"
              label="비밀번호" // label prop 사용
              variant="outlined"
              type="password"
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </li>
        <li>
          <BtnLogin isLoggedIn={false} loginData={loginData}></BtnLogin>
        </li>
      <li>
        <span>
          아직 계정이 없으신가요? 
          <BtnSingUp></BtnSingUp>
        </span>
      </li>
      </ul>
    </div>
  </div>
  );
}