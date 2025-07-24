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
    console.log("전체 API 응답:", response);

    const setCookieHeader = response.headers.get('set-cookie');
    console.log("Set-Cookie 헤더:", setCookieHeader);

    let jwtToken = '';
    if (setCookieHeader) {
      const cookies = Array.isArray(setCookieHeader)
        ? setCookieHeader
        : [setCookieHeader];

      for (const cookieString of cookies) {
        if (cookieString.includes('jwtToken=')) {
          const tokenMatch = cookieString.match(/jwtToken=([^;]+)/);
          if (tokenMatch && tokenMatch[1]) {
            jwtToken = tokenMatch[1];
            break;
          }
        }
      }
    }

    if (jwtToken) {
      return { isSuccess: true, token: jwtToken, message: response.data.message };
    } else {
      return { isSuccess: true, token: '', message: response.data.message || '로그인은 성공했으나, 토큰이 예상 헤더에서 발견되지 않았습니다.' };
    }
     } catch (error) {
        // 오류 처리
        return {isSuccess: false, token : '' , message: 'server Error' }
      } finally {
      }
}