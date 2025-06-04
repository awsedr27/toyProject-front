'use server'
import { redirect } from 'next/navigation'; 
import api from '@/lib/api';

export default async function Login(formData) {
  const email = formData.get('id');
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
      } finally {
      }
    return (
        'login'
    );
}