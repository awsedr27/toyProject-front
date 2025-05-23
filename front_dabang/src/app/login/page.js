'use client';
import { useState } from 'react';
import Link from 'next/link';
import LoginForm from '../components/layouts/forms/LoginForm';
import api from '../../lib/api';
import { useRouter } from 'next/navigation';

export default function Home() {
  //const [isLoading, setIsLoading] = useState(false);
  //const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  // 로그인 요청을 상위 컴포넌트에서 처리
  const handleLoginBtnClick = async (email, password) => {
    //setIsLoading(true);
   // setErrorMessage('');

    try {
      // 로그인 요청
      const response = await api.post('/users/login', {
        userId: email,  
        password: password,
      });
      const token = response.headers.get('Authorization');
      if (token) {
        localStorage.setItem('token', token.replace('Bearer ', ''));
      }
      alert(response.data.message);
      router.push('/main');  
    } catch (error) {
      // 오류 처리
      //setErrorMessage('로그인 실패: 이메일 또는 비밀번호를 확인하세요.');
    } finally {
     // setIsLoading(false);
    }
  };

  return (
    <LoginForm
    onClick={handleLoginBtnClick}
    ></LoginForm>
  );
}
