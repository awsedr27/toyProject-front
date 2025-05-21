'use client';

export default function BtnLogin({ isLoggedIn,onClick }) {


  return (
    <>
      {isLoggedIn ? (
        null
      ) : (
        <>
          <button onClick={onClick}>로그인</button>
        </>
      )}
    </>
  );
}