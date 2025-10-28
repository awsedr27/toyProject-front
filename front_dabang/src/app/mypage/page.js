import MyPageForm from "./mypageForm";
import ProfilePic from "../components/common/ProfilePic";
import { CustomBox } from "@/styles/CommonStyles";
import {Stack} from "@mui/material"
import {query} from "@/lib/db"
import { cookies } from 'next/headers';
import './myPage.css';


export default async function MyPage() {
    async function fetchUserProfile() {
        const cookieStore = await cookies();
        const preference = JSON.parse(cookieStore.get('userPrefs').value);
        const userId = preference.userId;
        console.log(preference);
        
        
        try{
            const result = await query(`SELECT profile_id, user_id, profile_name, profile_pic, language, status, created_at, updated_at
                            FROM profiles WHERE user_id = $1`, [userId]);
            if (result.rows.length != 0) {
                console.log(result.rows[0])
                return result.rows[0];
            }
        } catch (error) {
            console.error('Failed to fetch profile:', error);
            throw new Error('프로필을 불러오는 데 실패했습니다.');
     }
    } 

    
    const myProfile = await fetchUserProfile();
    console.log(myProfile);

    return(
        <>
        <CustomBox className='myPageBox' sx={{ mt: 10 }}> 
            <Stack sx={{paddingtop:'30px'}}>
                <ProfilePic picURL={process.env.NEXT_PUBLIC_RESOURCE_API_BASE_URL+myProfile.profile_pic} picSize="1" uploadBtn={true}></ProfilePic>
            </Stack>
            <Stack >
                <MyPageForm profile={myProfile}></MyPageForm>
            </Stack>
        </CustomBox>
        </>
    )
}


