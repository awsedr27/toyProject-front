'use server'
import api from '@/lib/api';

export default async function Signup(formData) {
  try {
    // 회원가입 요청
    const response = await api.post('/api/auth/signup',  formData);
    console.log(response);
    return {isSuccess: true,message: response.data.message}
     } catch (error) {
        // 오류 처리
        return {isSuccess: false, token : '' , message: 'server Error' }
      } finally {
      }
}
