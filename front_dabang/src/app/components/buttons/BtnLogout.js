'use client';
import { useRouter } from 'next/navigation';

export default function BtnLogout({ isLoggedIn }) {
  const router = useRouter();

  const handleLogoutClick = () => {
    localStorage.removeItem('authToken'); // 로컬 스토리지에서 토큰 제거
    router.refresh(); // 서버 컴포넌트 다시 렌더링
    alert('로그아웃 되었습니다.');
  };

  return (
    <>
      {isLoggedIn ? (
        <button onClick={handleLogoutClick}>로그아웃</button>
      ) : (
        null
      )}
    </>
  );
}