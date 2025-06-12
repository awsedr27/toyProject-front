'use client';
import React, { useEffect, useState, useRef } from 'react';
import {Button, FormControl, TextField} from "@mui/material";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function signUpPage() {
  const formRef = useRef(null);
  const [signUpValid, setValid] = useState(false);
  const [formData, setFormData] = useState([]);
  const [errorId, setError] = useState({
    password: '',
    passwordCk: '',
    email: '',
    phone: '',
  });

  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 표시용

  const onChange =(e)=>{
    const { name, value } = e.target; // 변경된 입력 필드의 name과 value를 가져옴
    let index = formData.findIndex(item => item.formName === name);
    if(index != -1){
      let newForm = [...formData];
      newForm[index] = {formName : name,value : value};
      setFormData(newForm);
    }else{
      setFormData([
          ...formData,
          {
            formName: name,    // 변경된 필드의 [name] 키에 새로운 value를 할당
            value: value
          }]
      );
    }
  };

  const focusOut = (e) => {
    let { name } = e.target; // 변경된 입력 필드의 name과 value를 가져옴
    let errorYn = false;
    let index = formData.findIndex(item => item.formName === name);
    if(index == -1) {return;}
    let checkValue = formData[index].value;
    switch (name){
      case "password" :
      case "passwordCk":
        let checkIndex = name === "password" ? formData.findIndex(item => item.formName === "passwordCk") : formData.findIndex(item => item.formName === "password");
        if(checkIndex == -1) {return;}
        let elseValue = formData[checkIndex].value;
        if(checkValue != elseValue){
          errorYn = true;
          name = "passwordCk";
        }else{
          errorYn = false;
          name = "passwordCk";
        }
        break;
      case "email":
        if(checkValue.indexOf("@") === -1 || checkValue.indexOf(".") < 3 ){
          errorYn = true;
        }
        break;
      case "phone":
        let regExp = /^0(?:0|1|[6-9])(?:\d{2,3}|\d{3,4})\d{4}$/;
        if(regExp.test(checkValue)){
          errorYn = false;
        }else{
          errorYn = true;
        }
        break;
    }
    setError({
      ...errorId,
      [name] : errorYn
    });
  }

  const signUpSubmit = async (e) => {
    if(errorId.passwordCk != false || errorId.email != false || errorId.password != false || errorId.phone != false ){
      alert("입력값 확인");
      return false;
    }
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    const options =  {
      method: 'POST',
      // mode: 'no-cors',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
      Credential:'include'
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
      router.replace('/login');
    } catch (err) {
      console.error('오류:', err);
      alert('네트워크 오류가 발생했습니다.');
    }
  };


  return (
      <div className="join-container">
        <h1>회원가입</h1>
        <div className="join-form">
          <FormControl>
            <ul style={{paddingRight: '40px'}}>
              <li>
                <TextField
                    id="userId1"
                    name="id"
                    label="아이디"
                    variant="outlined"
                    type="text"
                    onChange={onChange}
                    required
                    autoFocus
                />
              </li>
              <li>
                <TextField
                    id="password1"
                    name="password"
                    label="비밀번호"
                    variant="outlined"
                    type="password"
                    onChange={onChange}
                    onBlur={focusOut}
                    required
                />
              </li>
              <li>
                <TextField
                    id="passwordCk"
                    name="passwordCk"
                    label="비밀번호확인"
                    variant="outlined"
                    type="password"
                    onBlur={focusOut}
                    onChange={onChange}
                    error={errorId.passwordCk}
                    helperText={errorId.passwordCk ? "비밀번호가 일치하지 않습니다." : ""}
                    required
                />
              </li>
              <li>
                <TextField
                    id="email"
                    name="email"
                    label="이메일"
                    variant="outlined"
                    type="text"
                    onBlur={focusOut}
                    onChange={onChange}
                    error={errorId.email}
                    helperText={errorId.email ? "이메일 형식이 일치하지 않습니다." : ""}
                />
              </li>
              <li>
                <TextField
                    id="name"
                    name="name"
                    label="이름"
                    variant="outlined"
                    type="text"
                    onChange={onChange}
                />
              </li>
              <li>

                <TextField
                    id="phone"
                    name="phone"
                    label="전화번호"
                    variant="outlined"
                    type="text"
                    placeholder={"숫자만입력"}
                    onChange={onChange}
                    onBlur={focusOut}
                    error={errorId.phone}
                    helperText={errorId.phone ? "전화번호 양식이 맞지 않습니다." : ""}
                />
              </li>
              <li>
                <Button  variant="contained" onClick={signUpSubmit}>Sign Up</Button>
              </li>
            </ul>
          </FormControl>
        </div>
      </div>
  );
}
