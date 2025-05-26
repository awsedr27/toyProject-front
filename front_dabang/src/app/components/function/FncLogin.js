'use server'
import { redirect } from 'next/navigation'; 
import api from '../../../lib/api';

export default async function Login(formData) {
  const email = formData.get('email');
  const password = formData.get('password');  
  try {
      console.log('go');
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
        redirect('/main');  
      } catch (error) {
        // 오류 처리
        //setErrorMessage('로그인 실패: 이메일 또는 비밀번호를 확인하세요.');
      } finally {
      // setIsLoading(false);
      }
    return (
        'login'
    );
}