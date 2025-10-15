'use client'
import React, { useEffect, useState } from 'react';
import BtnLogin from "../components/buttons/BtnLogin";
import BtnSingUp from "../components/buttons/BtnSignUp";
import { TextField, FormControl } from '@mui/material';
import Trans from '../components/common/Trans';
import MessageBox from '../components/common/MessageBox';
import { useRouter } from 'next/navigation';
import { useApi } from '@/hooks/useApi'

export default function LoginForm({onSetLogin}) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [openMessageBox, setOpenMessageBox] = useState(false);
  const [messageBoxProps, setMessageBoxProps] = useState({});
  const {post} = useApi();



      
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

    try {
      const requestBody = {
        userId : id,
        password : password
      };
      const data = await post('/api/auth/login', requestBody);
      if (data) {
        console.log('로그인 성공!');
        router.replace('/movie');
      } else {
        console.log('로그인 실패');
      }
    } catch (error) {
      console.error('클라이언트 측 에러:', error);
    } 
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'id') setId(value);
    else if (name === 'password') setPassword(value);
  };
  
      
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
        <li style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <p style={{cursor:"pointer"}} onClick={() => {router.push('/user/find')}}>
            <Trans tkey={"LOGIN.TITLE.FIND_ACCOUNT"}/>
          </p>
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