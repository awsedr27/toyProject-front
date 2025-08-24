'use client';

import React, { useState } from 'react';
import {
    Box,
    Paper,
    Tabs,
    Tab,
    TextField,
    Button,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import {useApi} from "@/hooks/useApi";
import {CustomBox} from "@/styles/CommonStyles";
import logo_typo from "../../../../public/images/logo_typo.png";
import Image from "next/image";
import MessageBox from "@/app/components/common/MessageBox";
import Trans from "@/app/components/common/Trans";

export default function UserFindPage() {
    const router = useRouter();
    const { get, post } = useApi()
    const [openMessageBox, setOpenMessageBox] = useState(false);
    const [messageBoxProps, setMessageBoxProps] = useState({});

    const [tabIndex, setTabIndex] = useState(0);

    // 아이디 찾기 상태
    const [nameForId, setNameForId] = useState('');
    const [phoneForId, setPhoneForId] = useState('');
    const [foundId, setFoundId] = useState(null); // 아이디 찾기 결과

    // 비밀번호 찾기 상태
    const [userId, setUserId] = useState('');
    const [emailForPw, setEmailForPw] = useState('');
    const [pwSent, setPwSent] = useState(false); // 비밀번호 재설정 링크 발송 여부
    const handleOpenMessageBox = (props) => {
        setMessageBoxProps(props);
        setOpenMessageBox(true);
    };
    const handleCloseMessageBox = () => {
        setOpenMessageBox(false);
    };
    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
        // 탭 바꿀 때 상태 초기화
        setFoundId(null);
        setPwSent(false);
        setNameForId('');
        setPhoneForId('');
        setUserId('');
        setEmailForPw('');
    };

    const handleFindId = async (e) => {
        e.preventDefault();

        // 입력값 간단 검증 (클라이언트 사이드)
        if (!nameForId.trim() || !phoneForId.trim()) {
            handleOpenMessageBox({
                type: 'info',
                message: <Trans tkey={"LOGIN.ALERT.FIND.ENTER_NAME_PHONE_NUMBER"}/> ,
            });
            return;
        }

        try {
            const res = await post('/api/user/find/id', JSON.stringify({name: nameForId, phoneNumber: phoneForId}));

            if (res.status !== 200) {
                handleOpenMessageBox({
                    type: 'info',
                    message: <Trans tkey={res.code}/> ,
                });
                return;
            }

            setFoundId(res.data.userId); // 예: { userId: 'found_user123' }
        } catch (err) {
            handleOpenMessageBox({
                type: 'info',
                message: <Trans tkey={"COMM.ALERT.SERVER_ERROR"}/> ,
            });
            console.error(err);
        }
    };

    const handleFindPassword = async (e) => {
        e.preventDefault();

        if (!userId.trim() || !emailForPw.trim()) {
            handleOpenMessageBox({
                type: 'info',
                message: <Trans tkey={"LOGIN.ALERT.FIND.ENTER_ID_EMAIL"} />, // 이 키는 새로 추가 필요
            });
            return;
        }

        try {
            const res = await post('/api/user/find/password', JSON.stringify({
                userId,
                email: emailForPw,
            }));

            if (res.status !== 200) {
                handleOpenMessageBox({
                    type: 'info',
                    message: <Trans tkey={res.code} />,
                });
                return;
            }

            setPwSent(true); // 성공 시 메시지 보여주기
        } catch (err) {
            handleOpenMessageBox({
                type: 'info',
                message: <Trans tkey={"COMM.ALERT.SERVER_ERROR"} />,
            });
            console.error(err);
        }
    };


    return (
        <>
            <Image src={logo_typo} alt="logo_typo" width={'300'} height={'78'} style={{marginTop:80}} />
            <CustomBox sx={{ mt: 10 }}>
                <Tabs value={tabIndex} onChange={handleTabChange} centered>
                    <Tab label="아이디 찾기" />
                    <Tab label="비밀번호 찾기" />
                </Tabs>

                <Box sx={{ mt: 3 }}>
                    {tabIndex === 0 && (
                        <>
                            <Typography variant="h6" gutterBottom>
                                아이디 찾기
                            </Typography>

                            {foundId ? (
                                <>
                                    <Typography sx={{ my: 2, width: 300 }}>
                                        아이디는 <strong>{foundId}</strong> 입니다.
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={() => router.push('/login')}
                                    >
                                        홈으로 가기
                                    </Button>
                                </>
                            ) : (
                                <form onSubmit={handleFindId}>
                                    <TextField
                                        label="이름"
                                        fullWidth
                                        margin="normal"
                                        value={nameForId}
                                        onChange={(e) => setNameForId(e.target.value)}
                                    />
                                    <TextField
                                        label="전화번호"
                                        fullWidth
                                        margin="normal"
                                        value={phoneForId}
                                        onChange={(e) => setPhoneForId(e.target.value)}
                                    />
                                    <Button type="submit" variant="contained" fullWidth>
                                        아이디 찾기
                                    </Button>
                                </form>
                            )}
                        </>
                    )}

                    {tabIndex === 1 && (
                        <>
                            <Typography variant="h6" gutterBottom>
                                비밀번호 찾기
                            </Typography>

                            {pwSent ? (
                                <>
                                    <Typography sx={{ my: 2, width: 300 }}>
                                        입력하신 이메일로 비밀번호<br/> 재설정 링크가 발송되었습니다.
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={() => router.push('/login')}
                                    >
                                        홈으로 가기
                                    </Button>
                                </>
                            ) : (
                                <form onSubmit={handleFindPassword}>
                                    <TextField
                                        label="아이디"
                                        fullWidth
                                        margin="normal"
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value)}
                                    />
                                    <TextField
                                        label="이메일"
                                        fullWidth
                                        margin="normal"
                                        value={emailForPw}
                                        onChange={(e) => setEmailForPw(e.target.value)}
                                    />
                                    <Button type="submit" variant="contained" fullWidth>
                                        비밀번호 찾기
                                    </Button>
                                </form>
                            )}
                        </>
                    )}
                </Box>
            </CustomBox>
            <MessageBox
                open={openMessageBox}
                onClose={handleCloseMessageBox}
                {...messageBoxProps}
            />
        </>
    );
}
