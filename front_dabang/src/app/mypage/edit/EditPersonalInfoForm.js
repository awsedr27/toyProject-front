'use client'
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {useRouter} from 'next/navigation';
import Trans from "@/app/components/common/Trans";
import { CustomBox } from "@/styles/CommonStyles";
import { Button, TextField, Stack, FormControl, FormLabel, Typography } from "@mui/material";
import MessageBox from "@/app/components/common/MessageBox";
import { useApi } from "@/hooks/useApi";

export default function EditPersonalInfoForm() {
      const { post } = useApi();
      const router = useRouter();
      const [formData, setFormData] = useState([]);
      const [errorId, setError] = useState({
        password: '',
        passwordCk: '',
        email: '',
        phoneNumber: '',
      });

    const handleSubmit = (e) => {
        // try {
        //     //const response = await post('/api/auth/signup',tempParam);
        //     const response = await post('/api/auth/user/update',tempParam);
        //     if(response.data.success){
        //         console.log('회원가입 성공');
        //         router.replace('/login');
        //     }else{
        //         console.log('회원가입 실패');
        //     }
        // } catch (err) {
        // alert('네트워크 오류가 발생했습니다.');
        // }
    };

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


    return (
        <>
            <CustomBox component="form" onSubmit={handleSubmit} sx={{px:8, py:5}}>
                <h1><Trans tkey={"EDIT_PERSON_INFO.TITLE.EDIT_PERSON_INFO"}></Trans></h1>
                <FormControl>
                    <FormLabel htmlFor="id"><Trans tkey={"SIGNUP.NAME"}/></FormLabel>
                    <TextField
                        autoComplete="id"
                        name="id"
                        required
                        fullWidth
                        id="id"
                        label={<Trans tkey={"SIGNUP.NAME"}/>}
                        disabled
                    />
                    </FormControl>
                    <FormControl>
                    <FormLabel htmlFor="password"><Trans tkey={"SIGNUP.PW"}/></FormLabel>
                    <TextField
                        id="password1"
                        name="password"
                        label={<Trans tkey={"SIGNUP.PW"}/>}
                        variant="outlined"
                        type="password"
                        onChange={onChange}
                        onBlur={focusOut}
                        error={errorId.password}
                        helperText={errorId.password ? <Trans tkey={"SIGNUP.VALID.PW"}/> : ''}
                        required
                    />
                    </FormControl>
                    <FormControl>
                    <FormLabel htmlFor="password"><Trans tkey={"SIGNUP.PW_CHECK"}/></FormLabel>
                    <TextField
                        id="passwordCk"
                        name="passwordCk"
                        label={<Trans tkey={"SIGNUP.PW_CHECK"}/>}
                        variant="outlined"
                        type="password"
                        onBlur={focusOut}
                        onChange={onChange}
                        error={errorId.passwordCk}
                        helperText={errorId.passwordCk ? <Trans tkey={"SIGNUP.VALID.PW_CHECK"}/> : ""}
                        required
                    />
                    </FormControl>
                    <FormControl>
                    <FormLabel htmlFor="email"><Trans tkey={"SIGNUP.E_MAIL"}/></FormLabel>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        placeholder="your@email.com"
                        name="email"
                        autoComplete="email"
                        variant="outlined"
                    />
                    </FormControl>
                    <FormControl>
                    <FormLabel htmlFor="email"><Trans tkey={"SIGNUP.NAME"}/></FormLabel>
                    <TextField
                        id="name"
                        name="name"
                        label={<Trans tkey={"SIGNUP.NAME"}/>}
                        variant="outlined"
                        type="text"
                        onChange={onChange}
                        required
                    />
                    </FormControl>
                    <FormControl>
                    <FormLabel htmlFor="email"><Trans tkey={"SIGNUP.PHONE"}/></FormLabel>
                    <TextField
                        id="phone"
                        name="phoneNumber"
                        label={<Trans tkey={"SIGNUP.PHONE"}/>}
                        variant="outlined"
                        type="text"
                        onChange={onChange}
                        onBlur={focusOut}
                        error={errorId.phoneNumber}
                        helperText={errorId.phoneNumber ? <Trans tkey={"SIGNUP.VALID.PHONE"}/> : ""}
                        required
                    />
                    </FormControl>
                    <Typography><Trans tkey={""}/></Typography>
                    <br/>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                    <Trans tkey={"COMM.BTN.SAVE"}/>
                    </Button>
            </CustomBox>

        </>
    )
}