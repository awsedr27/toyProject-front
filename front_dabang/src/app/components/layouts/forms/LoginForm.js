'use client'
import React, { useState } from 'react';
import BtnLogin from "../../buttons/BtnLogin";
import BtnSingUp from "../../buttons/BtnSignUp";
import { TextField, FormControl } from '@mui/material';
import Login from '../../function/FncLogin';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 표시용

  const handleLoginSubmit = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append('email', email); //name
    formData.append('password', password); 
    try {
      const result = await Login(formData);
      
      if (result && result.success === false) {
          alert(result.message);
      }
    } catch (error) {
      console.error('클라이언트 측 에러:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
  };

  return (
      <div className="login-container">
    <h1>로그인</h1>
    <div className="login-form">
      <FormControl>
      <ul>
          <li>
            <TextField
              id="email"
              name="email"
              label="이메일" 
              variant="outlined"
              type="email"
              value={email}
              onChange={handleChange}
              required
              autoFocus
            />
          </li>
          <li>
            <TextField
              id="password"
              name="password"
              label="비밀번호"
              variant="outlined"
              type="password"
              value={password}
              onChange={handleChange}
              required
            />
          </li>
        <li>
          <BtnLogin isLoggedIn={false} onClick={handleLoginSubmit}></BtnLogin>
        </li>
      <li>
        <span>
          아직 계정이 없으신가요?         <BtnSingUp></BtnSingUp>
        </span>
      </li>
      </ul>
      </FormControl>
    </div>
  </div>
  );
}