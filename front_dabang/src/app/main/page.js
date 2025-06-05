'use client';
import Link from 'next/link';
import LoginForm from '../components/layouts/forms/LoginForm';
import api from '../../lib/api';
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Button,
  Stack,
  Chip,
  Box,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
export default function Home() {
  const [sampleData, setSampleData] = useState([]);
  const test = async (email, password) => {
    //setIsLoading(true);
   // setErrorMessage('');

    try {
      // 로그인 요청
      const response = await api.post('/test/sampleData');
      setSampleData(response.data.GcOutlawParking.row);
    } catch (error) {
      // 오류 처리
      //setErrorMessage('로그인 실패: 이메일 또는 비밀번호를 확인하세요.');
    } finally {
     // setIsLoading(false);
    }
  };
  return (
    <Box sx={{ maxWidth: 700, margin: "auto", mt: 4, px: 2 }}>
      <Button variant="contained" onClick={test}>
        데이터 불러오기
      </Button>

      <Paper 
        elevation={4} 
        sx={{ 
          mt: 3, 
          p: 3, 
          flexGrow: 1,  // Box 내부에서 Paper가 남는 공간 다 채우도록
          overflowY: 'auto', // 세로 스크롤 허용
          maxHeight: 'calc(60vh - 64px)' // 버튼 제외한 최대 높이 지정 (조절 가능)
        }}
      >
        <Typography variant="h5" gutterBottom>
          공공데이터 주차 감시기 현황
        </Typography>

        {sampleData.length === 0 ? (
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            데이터를 불러오려면 버튼을 눌러주세요.
          </Typography>
        ) : (
          <List>
            {sampleData.map((item, idx) => (
              <React.Fragment key={item.SN + idx}>
                <ListItem alignItems="flex-start" sx={{ py: 1.5 }}>
                  <ListItemAvatar>
                    <Avatar>
                      <DirectionsCarIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={1}
                      >
                        <Typography variant="subtitle1" fontWeight="bold">
                          {item.INST_NM}
                        </Typography>
                        <Chip
                          label={item.OPER_YN === "0Y" ? "운영 중" : "미운영"}
                          color={item.OPER_YN === "0Y" ? "success" : "default"}
                          size="small"
                        />
                      </Stack>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.primary">
                          모델명: {item.MDL_NM}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          일련번호: {item.SN}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          감지 횟수: {item.ULFL_PKST_DTCT_CNT} / 5분 초과:{" "}
                          {item.MNT5_OVER_PKST_VHCL_DTCT}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          마지막 입력 시간: {item.INPT_DT}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {idx !== sampleData.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
}
