'use client';
import { useState } from 'react';
import Link from 'next/link';
import LoginForm from '../components/layouts/forms/LoginForm';
import api from '../../lib/api';
import { useRouter } from 'next/navigation';

export default function Home() {
  const test = async (email, password) => {
    //setIsLoading(true);
   // setErrorMessage('');

    try {
      // 로그인 요청
      const response = await api.post('/users/refresh');
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
    <div>메인화면입니다.
      <button onClick={test}>test</button>
    </div>
  );
}
