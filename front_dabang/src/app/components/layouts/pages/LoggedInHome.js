// components/LoggedInHome.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// 클라이언트 전용 로그아웃 함수 임포트
import { logoutClient } from '@/app/components/function/FncAuthClient'; // 아래에서 정의

export default function LoggedInHome({ user }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    logoutClient(); // 로컬 스토리지에서 토큰 삭제
    router.refresh(); // 페이지 데이터를 갱신하여 App Router가 다시 렌더링되도록 함 (ClientAuthWrapper가 상태를 다시 확인)
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid green', margin: '20px', backgroundColor: '#e6ffe6' }}>
      <h2>안녕하세요, {user?.name || '사용자'}님! 👋</h2>
      <p>로그인된 사용자에게만 보이는 메인 콘텐츠입니다.</p>
      <p>이메일: {user?.email || 'N/A'}</p>
      <button onClick={handleLogout} disabled={loading} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        {loading ? '로그아웃 중...' : '로그아웃'}
      </button>
      <p style={{ marginTop: '10px', fontSize: '0.9em', color: '#555' }}>이 섹션은 클라이언트에서 상호작용합니다.</p>
    </div>
  );
}