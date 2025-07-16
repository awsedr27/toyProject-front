'use client'
import React, { useEffect, useState } from 'react';
import BtnLogin from "../../buttons/BtnLogin";
import BtnSingUp from "../../buttons/BtnSignUp";
import { TextField, FormControl } from '@mui/material';
import Login from '../../function/FncLogin';
import { useRouter } from 'next/navigation';

export default function LoginForm({onSetLogin, activeForm}) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 표시용
  const router = useRouter();

  const handleLoginSubmit = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append('id', id); //name
    formData.append('password', password); 
    try {
      const result = await Login(formData);
      
      if (result.isSuccess === true) {
        localStorage.setItem('token', result.token);
        console.log(localStorage.getItem('token'));
        onSetLogin(true); // 로그인 성공 전달
      }else{
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
    if (name === 'id') setId(value);
    else if (name === 'password') setPassword(value);
  };

  useEffect(() => {
    if (isLoading) {
      return () => {
          <div style={{ padding: '50px', fontSize: '20px', textAlign: 'center' }}>
          <div style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #3498db', borderRadius: '50%', width: '30px', height: '30px', animation: 'spin 1s linear infinite', margin: '10px auto' }}></div>
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
              }
              `}</style>
        </div>
          };
    }
      }, [isLoading]);

  const signupOpen = () => {
    activeForm("S");
  }

  return (
      <div className="login-container">
    <h1>로그인</h1>
    <div className="login-form">
      <FormControl>
      <ul  style={{ paddingRight: '40px' }}>
          <li>
            <TextField
              id="userId"
              name="id"
              label="아이디" 
              variant="outlined"
              type="text"
              value={id}
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
      <li style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p>
          아직 계정이 없으신가요?             
        </p>
        <BtnSingUp activeForm={signupOpen}></BtnSingUp>
      </li>
      </ul>
      </FormControl>
    </div>
  </div>
  );
}