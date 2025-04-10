import React, { useState } from 'react';
import logo from './shiba.png';
import './App.css';
import LoginForm from './LoginForm'; // LoginForm 컴포넌트 import

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (username, password) => {
        // 실제 로그인 로직 (API 호출 등)
        // 예시: 간단하게 username, password가 맞으면 로그인 성공 처리
        if (username === 'test' && password === '1234') {
            setIsLoggedIn(true);

            //---------------------------------------------------
            try {
                    const response = fetch('http://localhost:8080/auth/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username,
                            password,
                        }),
                    });
                    if (!response.ok) {
                        const err = response.json();
                        alert(`로그인 실패: ${err.message || '에러 발생'}`);
                        return;
                    }
                    const data = response.json();
                    console.log('로그인 성공:', data);
                    // JWT 토큰 저장
                    localStorage.setItem('token', data.token);
                    // 로그인 성공 후 페이지 이동 처리 (React Router 있을 경우)
                    // navigate('/dashboard');
                } catch (err) {
                    console.error('네트워크 에러:', err);
                    alert('서버 통신 실패');
                }

            //---------------------------------------------------

        } else {
            alert('로그인 실패!');
        }
    };

    return (
        <div className="App" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* 상단: 로고 영역 */}
            <div style={{ height: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={logo} alt="Logo" style={{ maxWidth: '200px', maxHeight: '200px' }} />
            </div>

            {/* 하단: 로그인 폼 또는 환영 메시지 영역 */}
            <div style={{ height: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {!isLoggedIn ? (
                    <LoginForm onLogin={handleLogin} /> // LoginForm 컴포넌트 사용
                ) : (
                    <div style={{ textAlign: 'center', fontSize: '24px' }}>HelloWorld!!</div>
                )}
            </div>
        </div>
    );
}

export default App;