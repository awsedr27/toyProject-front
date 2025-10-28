import EditPersonalInfoForm from "./EditPersonalInfoForm";
import {query} from "@/lib/db"
import { cookies } from 'next/headers';

export default async function EditPersonalInfo(){
    async function fetchUser(userId) {
            const cookieStore = await cookies();
            const token = cookieStore.get('accessToken');
            console.log(token);
            
            try{
                const result = await query(`SELECT * FROM users WHERE user_id = $1`, [userId]);
                if (result.rows.length != 0) {
                    console.log(result.rows[0])
                    return result.rows[0];
                }
            } catch (error) {
                console.error('Failed to fetch profile:', error);
                throw new Error('프로필을 불러오는 데 실패했습니다.');
         }
        } 
        const myProfile = await fetchUser('abcd');
        console.log(myProfile);
    


        return (
            <>
            <EditPersonalInfoForm></EditPersonalInfoForm>
            </>
        )
};