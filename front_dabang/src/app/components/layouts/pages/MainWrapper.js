'use client'
import { useState, useEffect } from 'react';
import { isAuthenticatedClient, getUserTokenClient } from '@/app/components/function/FncAuthClient';
import CircularProgress, {  circularProgressClasses } from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import LoggedOutHome from "./LoggedOutHome";

export default function MainWrapper(){
    const [authenticated, setAuthenticated] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(true);
    
    //권한 체크 추가 예정 (admin / user)

    useEffect(() => {
      const checkAuth = () => {
        const isAuth = isAuthenticatedClient();
        setAuthenticated(isAuth);
        setLoadingAuth(false);
      };

      checkAuth(); 

      return () => {
          };
    }, []);
    if (loadingAuth) {
        return (
            <Box sx={{ display: 'flex' }}>
              <p>인증 상태 확인 중...</p>
              <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={(theme) => ({
                  color: '#1a90ff',
                  animationDuration: '550ms',
                  position: 'absolute',
                  left: 0,
                  [`& .${circularProgressClasses.circle}`]: {
                    strokeLinecap: 'round',
                  },
                  ...theme.applyStyles('dark', {
                    color: '#308fe8',
                  }),
                })}
                size={40}
                thickness={4}
              />
            </Box>
        );
    }
    
    return (
        <>
        </>
    );


}