'use client'
import React from "react";
import "./signup.css";
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
export default function SignUp() {
    const router = useRouter();
    const formRef_su = useRef(null);



        const fn_signup = async () => {
            const formData = new FormData(formRef_su.current);
            const data = Object.fromEntries(formData.entries());
            const options =  {
                method: 'POST',
                //mode: 'cors',
                //mode: 'no-cors',
                headers: { 'content-type': 'application/json', 'Authorization' : 'NfWbUeYf3KxYFvD0c9N0+jEwTUzpYx3NbyX+PRT7c1pTCNy+xUJtbv9n=='},
                body: JSON.stringify(data),
            };

            try {
                await fetch(`http://localhost:8080/users/signup`, options).then((rt) => {
                    if (!rt.ok) {
                        const error =  rt.text();
                        alert(`회원가입 실패: ${error}`);
                        return;
                    }  else{
                        router.push('/login');
                    }
                });
            } catch (err) {
                alert(err);
                console.log(err);
            }
        }


        return (
            <div className="main_contain signup">
                <form ref={formRef_su}>
                    <div>
                        <h1 id='register_title'> 회원가입</h1>
                    </div>
                    <div className='register'>
                        <div>
                            {/* 아이디 */}
                            <div>
                                <h5> 아이디 </h5>
                                <input type='text' className="input-field" maxLength='20' name='userId' placeholder="7자 이상의 문자" autoFocus/>
                                <button type="button" id="dupIdCheck">중복확인</button>
                            </div>

                            {/* 비밀번호 */}
                            <div>
                                <h5> 비밀번호 </h5>
                                <input type='password' className="input-field" maxLength='15' name='password' placeholder="비밀번호"/>
                            </div>

                            {/* 비밀번호 */}
                            <div>
                                <h5> 비밀번호 확인 </h5>
                                <input type='password' className="input-field" maxLength='15' name='register_pswCheck' placeholder="비밀번호 확인"/>
                            </div>

                            {/* 이름 */}
                            <div>
                                <h5> 이름 </h5>
                                <input type='text' className="input-field" maxLength='10' name='userName' placeholder="이름"/>
                            </div>

                            {/* 생년월일 */}
                            {/*<div>
                                <h5> 생년월일 </h5>
                                <input type='text' className="input-field2" maxLength='6' name='register_birthday'/> -&nbsp;
                                <input type='text' className="input-field3" maxLength='1' name='register_sex'/> ******
                            </div>*/}

                            {/* 이메일 */}
    {/*                        <div>
                                <h5> 이메일 </h5>
                                <input type='text' className="input-field2" maxLength='15' name='register_email'/> @&nbsp;
                                <select name='register_email_select'  onChange={changeEmailSelect}>
                                    <option value='gmail.com'> gmail.com </option>
                                    <option value='naver.com'> naver.com </option>
                                    <option value='write'> 직접 입력 </option>
                                </select>
                            </div>*/}

                            {/* 주소 추가해야됨 */}
                        </div>
                    </div>

                    <div>
                        <button type="submit" id="sbtn" onClick={fn_signup}>가입하기&nbsp;🎉</button>
                    </div>
                </form>
            </div>
        )
}
