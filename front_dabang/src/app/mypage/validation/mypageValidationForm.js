'use client'
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {useRouter} from 'next/navigation';
import Trans from "@/app/components/common/Trans";
import { CustomBox } from "@/styles/CommonStyles";
import { Button, TextField, Stack } from "@mui/material";
import MessageBox from "@/app/components/common/MessageBox";
import { useApi } from "@/hooks/useApi";

export default function PWValidationForm({}){
    const searchParams = useSearchParams();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [openMessageBox, setOpenMessageBox] = useState(false);
    const [messageBoxProps, setMessageBoxProps] = useState({});
    const { post } = useApi();
    const router = useRouter();

    const handleOpenMessageBox = (props) => {
        setMessageBoxProps(props);
        setOpenMessageBox(true);
    };
    const handleCloseMessageBox = () => {
        setOpenMessageBox(false);
    };

    useEffect(() => {
        const id = searchParams.get('userId');
            if (id) {
            setId(id);
            }
    }, [searchParams]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'password') setPassword(value);
    };

    const handlePwSubmit = async () => {
    if (id == '') {
        handleOpenMessageBox({
            type: 'info',
            message: <Trans tkey={"MYPAGE.MSG.NO_ID"}/> ,
        });
    }else if (password == '') {
         handleOpenMessageBox({
            type: 'info',
            message: <Trans tkey={"MYPAGE.MSG.NO_PW"}/> ,
        });
    }

    try {
        const requestBody = {
            userId : id,
            password : password
            };
        const res = await post('/api/user/valid/password', requestBody);
        
        if (res.status == 200 ) {
            router.replace('/mypage/edit');
        } else if(res.status == 401) {
            handleOpenMessageBox({
            type: 'info',
            message: <Trans tkey={"MYPAGE.MSG.INVALID_PW"}/> ,
        });
        } else{
            handleOpenMessageBox({
                type: 'info',
                message: <Trans tkey={res.code} />,
            });
            return;
        }
    } catch (error) {
        console.error('클라이언트 측 에러:', error);
    } 
    };


    
    return (
        <>
        <CustomBox sx={{ mt: 20 , width:300, height: 250 }}>
            <Stack sx={{ mt: 8}}>
                <TextField id="password" name="password" type="password" onChange={handleChange} label={<Trans tkey={"SIGNUP.PW"}/>  }></TextField>
            </Stack>
            <Stack sx={{ mt : 2, ml : 20}}>
                <Button variant="contained" onClick={handlePwSubmit}><Trans tkey={"COMM.BTN.OK"}/></Button>
            </Stack>
        </CustomBox>
        <input id="userId" name="id" hidden={true}></input>
        <MessageBox
            open={openMessageBox}
            onClose={handleCloseMessageBox}
            {...messageBoxProps}
        />
        </>
    )
}