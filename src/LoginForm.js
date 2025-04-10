import React, { useState } from 'react';
import './LoginForm.css';

function LoginForm({onLogin}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password); // 부모 컴포넌트로 로그인 정보 전달

        // 로그인 처리 로직
    };
    const handleRegisterClick = () => {
        alert('회원가입 가능 기간이 아닙니다.');
    }

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2>로그인</h2>
            <div className="input-group">
                <label htmlFor="username">아이디</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label htmlFor="password">비밀번호</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">로그인</button>
            <div className="register-links">
                <p>
                    <a href="#" onClick={() => handleRegisterClick()}>회원가입</a>
                </p>
            </div>
        </form>
    );
}

export default LoginForm;