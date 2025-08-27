import MyPageForm from "./MypageForm";
import ProfilePic from "./ProfilePic";
import { CustomBox } from "@/styles/CommonStyles";
import {rgbToHex, Stack} from "@mui/material"
import callInternalApi from "@/lib/callInternalApi";
import './myPage.css';


export default function MyPage() {
    const user = {};


    return(
        <>
        <CustomBox className='myPageBox'>
            <Stack sx={{paddingtop:'30px'}}>
                <ProfilePic picSize="1" uploadBtn={true}></ProfilePic>
            </Stack>
            <Stack >
                <MyPageForm></MyPageForm>
            </Stack>
        </CustomBox>
        </>
    )
}


