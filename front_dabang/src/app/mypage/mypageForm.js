'use client'
import { useEffect, useState } from "react";
import {Link, Stack} from "@mui/material";
import Trans from "../components/common/Trans";
//import { useLoading } from "@/app/LoadingContext";

export default function MyPageForm({ profile }) {
   // const {setIsReady } = useLoading(); 

    
    // useEffect(() => {
    //     setIsReady(true); 
    //  }, [profile])

    return(
        <>
           {/* {error && <MessageBox message={error} />} */}
            <Stack>
                <span className='myPageProfileName'>{profile.profile_name}<Trans tkey={"COMM.USER.TITLE"}/></span>
            </Stack>
            <Stack>
                <Link className='myPageBtnList' variant ="contained" href={"/mypage/validation?userId=" + profile.user_id}><Trans tkey={"MYPAGE.BTN.EDIT_PERSONAL_INFO"}/><span>{'>'}</span></Link>
                <Link className='myPageBtnList' variant ="contained" href="/mypage/activity"><Trans tkey={"MYPAGE.BTN.MY_ACTIVITIES"}/><span>{'>'}</span></Link>
                <Link className='myPageBtnList' variant ="contained" href="/mypage/settings"><Trans tkey={"MYPAGE.BTN.SETTINGS"}/><span>{'>'}</span></Link>
            </Stack>

        </>
    )
}