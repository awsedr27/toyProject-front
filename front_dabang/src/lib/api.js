import axios from 'axios';
// Axios 인스턴스 생성
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // || 'http://localhost:8080', // 스프링부트 주소
  withCredentials: true, // 필요 시 쿠키 포함
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (예: JWT 토큰 자동 추가)
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 (예: 에러 처리 통합)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      console.error(`[API ERROR] ${status}:`, data);
    } else {
      console.error('[API ERROR] 네트워크 오류 또는 서버 연결 실패');
    }
    return Promise.reject(error);
  }
);

export default api;