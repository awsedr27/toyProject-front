'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="login-container">
      <h1>로그인</h1>
      <form className="login-form">
        <label htmlFor="email">이메일</label>
        <input type="email" id="email" name="email" required autoFocus />

        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">로그인</button>
      </form>
      <p>
        아직 계정이 없으신가요? <Link href="/join">회원가입</Link>
      </p>
    </div>
  );
}
