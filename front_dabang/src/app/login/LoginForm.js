'use client'
import React, { useEffect, useState } from 'react';
import BtnLogin from "../components/buttons/BtnLogin";
import BtnSingUp from "../components/buttons/BtnSignUp";
import { TextField, FormControl } from '@mui/material';
import Trans from '../components/common/Trans';
import MessageBox from '../components/common/MessageBox';
import api from "@/lib/api";
import { useRouter } from 'next/navigation';

export default function LoginForm({onSetLogin}) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 표시용
  const [openMessageBox, setOpenMessageBox] = useState(false);
  const [messageBoxProps, setMessageBoxProps] = useState({});
      
      const handleOpenMessageBox = (props) => {
        setMessageBoxProps(props);
        setOpenMessageBox(true);
      };
      const handleCloseMessageBox = () => {
       setOpenMessageBox(false);
      };
  const router = useRouter();

  const handleLoginSubmit = async () => {
    if (id == '' || password == '') {
      handleOpenMessageBox({
          type: 'info',
          message: <Trans tkey={"LOGIN.ALERT.ENTER_ID_PW"}/> ,
        });
    }

    setIsLoading(true);
    try {
      const requestBody = {
        userId : id,
        password : password
      };
      const result = await api.post('/api/auth/login', requestBody);
      if (result.data.success) {
        console.log('로그인 성공!');
        router.replace('/profile');
      } else {
        console.log('로그인 실패');
      }
    } catch (error) {
      console.error('클라이언트 측 에러:', error);
    } finally {
      setIsLoading(false);
    }
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'id') setId(value);
    else if (name === 'password') setPassword(value);
  };
  
  useEffect(() => {
    if (isLoading) {
      return () => {
        <div style={{ padding: '50px', fontSize: '20px', textAlign: 'center' }}>
          <div style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #3498db', borderRadius: '50%', width: '30px', height: '30px', animation: 'spin 1s linear infinite', margin: '10px auto' }}></div>
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
              }
              `}</style>
        </div>
          };
        }
      }, [isLoading]);
      
  return (
    <>
    <div className="login-container">
    <h1><Trans tkey={"LOGIN.TITLE.LOGIN"}/></h1>
    <div className="login-form">
      <FormControl>
      <ul  style={{ paddingRight: '40px' }}>
          <li>
            <TextField
              id="userId"
              name="id"
              label={<Trans tkey={"LOGIN.PHOLODER.ID"}/>}
              variant="outlined"
              type="text"
              value={id}
              onChange={handleChange}
              required
              autoFocus
            />
          </li>
          <li>
            <TextField
              id="password"
              name="password"
              label={<Trans tkey={"LOGIN.PHOLODER.PW"}/>}
              variant="outlined"
              type="password"
              value={password}
              onChange={handleChange}
              required
            />
          </li>
        <li>
          <BtnLogin isLoggedIn={false} onClick={handleLoginSubmit}></BtnLogin>
        </li>
      <li style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p>
          <Trans tkey={"LOGIN.TITLE.CREATE_ACCOUNT"}/>
        </p>
        <BtnSingUp></BtnSingUp>
      </li>
      </ul>
      </FormControl>
    </div>
  </div>
    <MessageBox
      open={openMessageBox}
      onClose={handleCloseMessageBox}
      {...messageBoxProps}
    />
    </>
  );
}