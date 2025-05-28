// components/LoggedOutHome.js
'use client';

import LoginForm from '@/app/components/layouts/forms/LoginForm'; // 앞서 만든 LoginForm 컴포넌트 임포트
import { useRouter } from 'next/navigation';

export default function LoggedOutHome() {
  const router = useRouter();

  return (
    <div style={{ padding: '20px', border: '1px solid orange', margin: '20px', backgroundColor: '#fffbe6' }}>
      <h2>환영합니다!</h2>
      <p>서비스를 이용하려면 로그인해주세요.</p>
      <LoginForm /> {/* 로그인 폼 포함 */}
      <button onClick={() => router.push('/signup')} style={{ marginTop: '15px', padding: '10px 20px', cursor: 'pointer' }}>
        회원가입
      </button>
      <p style={{ marginTop: '10px', fontSize: '0.9em', color: '#555' }}>이 섹션은 클라이언트에서 상호작용합니다.</p>
    </div>
  );
}