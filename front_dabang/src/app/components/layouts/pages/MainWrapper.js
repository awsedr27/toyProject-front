'use client'
import { useState, useEffect } from 'react';
import { isAuthenticatedClient, getUserTokenClient } from '@/app/components/function/FncAuthClient';
import LoggedInHome from "./LoggedInHome";
import LoggedOutHome from "./LoggedOutHome";

export default function MainWrapper(){
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);
    
    useEffect(() => {
    const checkAuth = () => {
      const isAuth = isAuthenticatedClient();
      setAuthenticated(isAuth);
      if (isAuth) {
        setUser(getUserSessionClient());
      } else {
        setUser(null);
      }
      setLoadingAuth(false);
    };

    checkAuth(); 

    return () => {
        };
    }, []);
    if (loadingAuth) {
        return (
            <div style={{ padding: '50px', fontSize: '20px', textAlign: 'center' }}>
            <p>인증 상태 확인 중...</p>
            {/* 간단한 로딩 스피너 추가 */}
            <div style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #3498db', borderRadius: '50%', width: '30px', height: '30px', animation: 'spin 1s linear infinite', margin: '10px auto' }}></div>
            <style jsx>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
                }
                `}</style>
          </div>
        );
    }
    
    return (
        <>
            {authenticated ? (
            <LoggedInHome user={user} />
            ) : (
            <LoggedOutHome />
            )}
        </>
    );


}