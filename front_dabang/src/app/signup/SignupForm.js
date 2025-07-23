'use client';
import React, { useEffect, useState, useRef } from 'react';
import {Button, FormControl, TextField} from "@mui/material";
import Signup from "@/app/components/function/FncSignup";
import { useRouter } from 'next/navigation';

export default function SignUpPage({activeForm}) {
  const router = useRouter();
  const [formData, setFormData] = useState([]);
  const [errorId, setError] = useState({
    password: '',
    passwordCk: '',
    email: '',
    phoneNumber: '',
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

  const focusOut = async (e) => {
    let { name } = e.target; // 변경된 입력 필드의 name과 value를 가져옴
    await errorCheck(name);
    if(name === "password" && errorId.password != true){errorCheck("passwordCk")}
  }

  const errorCheck =  (name) => {
    let errorYn = false;
    let index = formData.findIndex(item => item.formName === name);
    if(index == -1) {return;}
    let pwRegExp =/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;
    let phoneRegExp = /^0\d{2,3}\d{3,4}\d{4}$/;
    let checkValue = formData[index].value;
    switch (name){
      case "password" :
        if(!pwRegExp.test(checkValue)){
          errorYn = true;
        }else{
          errorYn = false;
        }
        break;
      case "passwordCk":
        let pwIndex = formData.findIndex(item => item.formName === "password");
        let pwValue = formData[pwIndex].value;
        if(!pwRegExp.test(pwValue)){
          name = "password";
          errorYn = true;
          return;
        }else{
          setError({
            ...errorId,
            "password" : false
          });
          if(checkValue === pwValue || checkValue == "" || pwValue == "" || errorId.password){
            name = "passwordCk";
            errorYn = false;
          }else{
            name = "passwordCk";
            errorYn = true;
          }
        }
        break;
      case "email":
        if(checkValue.indexOf("@") === -1 || checkValue.indexOf(".") < 3 ){
          errorYn = true;
        }else{
          errorYn = false;
        }
        break;
      case "phoneNumber":

        if(phoneRegExp.test(checkValue)){
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
    return;
  }

  const signUpSubmit = async (e) => {
    let isValid = true;
    const loginValue = new Object();
    formData.forEach(itm => {
      loginValue[itm.formName] =  itm.value;
      if(itm.value == ""){
        isValid = false;
      }
    });

    if(errorId.passwordCk != false || errorId.email != false || errorId.password != false || errorId.phoneNumber != false || !isValid){
      alert("입력값 확인");
      return false;
    }
    e.preventDefault();
    let tempParam = JSON.stringify(loginValue);
    try {
      const response = await Signup(tempParam);
      alert(response.message);
      router.replace('/login');
    } catch (err) {
      alert('네트워크 오류가 발생했습니다.');
    }
  };

  const closeSignup = () => {
    //activeForm("L");
    router.back();
  }
  return (
      <div className="join-container">
        <h1>회원가입</h1>
        <div className="join-form">
          <FormControl>
            <ul style={{paddingRight: '40px'}}>
              <li>
                <TextField
                    id="userId1"
                    name="userId"
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
                    error={errorId.password}
                    helperText={errorId.password ? "비밀번호는 8글자이상 영문과 특수문자( !,@,#,$,%,^,&,*.(.) )가 혼합되어야합니다." : ''}
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
                    required
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
                    required
                />
              </li>
              <li>

                <TextField
                    id="phone"
                    name="phoneNumber"
                    label="전화번호"
                    variant="outlined"
                    type="text"
                    placeholder={"숫자만입력"}
                    onChange={onChange}
                    onBlur={focusOut}
                    error={errorId.phoneNumber}
                    helperText={errorId.phoneNumber ? "전화번호 양식이 맞지 않습니다." : ""}
                    required
                />
              </li>
              <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <li>
                  <Button variant="contained" onClick={signUpSubmit}>Sign Up</Button>
                  <Button variant="contained" color="primary" onClick={closeSignup}>
                    취소
                  </Button>
                </li>
              </ul>
            </ul>
          </FormControl>
        </div>
      </div>
  );
}
