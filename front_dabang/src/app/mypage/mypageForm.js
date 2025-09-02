'use client'
import { useEffect } from "react";
import {Link, Stack} from "@mui/material";
import Trans from "../components/common/Trans";
import { useLoading } from "@/context/LoadingContext";

export default function MyPageForm() {
    const user = {};
    const { setIsReady } = useLoading(); 
    
    useEffect(() => {
        setIsReady(true);
      }, [])

    const hanhandleBtnClick = function (id){
        switch(id){
            case 1 : //Edit Personal Info
                    
                break;
            case 2 : break;
            case 3 : break;
        }

    }

    return(
        <>
            {/* {profileName} */}
            <Stack>
                <span className='myPageProfileName'>test<Trans tkey={"COMM.USER.TITLE"}/></span>
            </Stack>
            <Stack>
                <Link className='myPageBtnList' variant ="contained" href="/mypage/info"><Trans tkey={"MYPAGE.BTN.EDIT_PERSONAL_INFO"}/><span>{'>'}</span></Link>
                <Link className='myPageBtnList' variant ="contained" href="/mypage/activity"><Trans tkey={"MYPAGE.BTN.MY_ACTIVITIES"}/><span>{'>'}</span></Link>
                <Link className='myPageBtnList' variant ="contained" href="/mypage/settings"><Trans tkey={"MYPAGE.BTN.SETTINGS"}/><span>{'>'}</span></Link>
            </Stack>

        </>
    )
}