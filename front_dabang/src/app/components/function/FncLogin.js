'use server'
import { redirect } from 'next/navigation'; 
import api from '@/lib/api';

export default async function Login(formData) {
  const email = formData.get('id');
  const password = formData.get('password');  
  try {
    // 로그인 요청
    const response = await api.post('/users/login', {
      userId: email,  
      password: password,
    });
    console.log(response);
    const token = response.headers.get('Authorization');
    if (token) {
      token.replace('Bearer ', '');
      return {isSuccess: true, token : token.replace('Bearer ', ''), message: response.data.message }
      }
     } catch (error) {
        // 오류 처리
        return {isSuccess: false, token : '' , message: 'server Error' }
      } finally {
      }
}