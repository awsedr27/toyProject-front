'use client';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function signUpPage() {
  const router = useRouter();
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    const options =  {
      method: 'POST',
      // mode: 'no-cors',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    };
    if (data.password !== data.confirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/signup`, options);

      if (!response.ok) {
        const error = await response.text();
        alert(`회원가입 실패: ${error}`);
        return;
      }

      const result = await response.json();
      alert(result['message']);
      if (result.CODE != 0) {
        return;
      }
      router.push('/login');
    } catch (err) {
      console.error('오류:', err);
      alert('네트워크 오류가 발생했습니다.');
    }
  };

  return (
    <div className="join-container">
      <h1>회원가입</h1>
      <form ref={formRef} className="join-form" onSubmit={handleSubmit}>
        <label htmlFor="userId">아이디</label>
        <input type="text" id="userId" name="userId" required />

        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" name="password" required />

        <label htmlFor="confirm">비밀번호 확인</label>
        <input type="password" id="confirm" name="confirm" required />

        <label htmlFor="email">이메일</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="name">이름</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="phoneNumber">전화번호</label>
        <input type="tel" id="phoneNumber" name="phoneNumber" required />

        <input type="hidden" name="used" value="true" />

        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}
