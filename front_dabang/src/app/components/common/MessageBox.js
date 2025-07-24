"use client"; // Next.js 13+ App Router에서 클라이언트 컴포넌트로 지정

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Trans from '@/app/components/common/Trans';

/**
 * Material UI 기반 공용 메시지 박스 컴포넌트
 * @param {object} props - 컴포넌트 속성
 * @param {boolean} props.open - 메시지 박스 열림/닫힘 상태
 * @param {function} props.onClose - 메시지 박스 닫기 핸들러
 * @param {'info' | 'warning' | 'error' | 'success'} [props.type='info'] - 메시지 유형 (아이콘 및 타이틀 변경)
 * @param {string} props.title - 메시지 박스 제목 (생략 시 type에 따라 자동 생성)
 * @param {string} props.message - 표시할 메시지 내용
 * @param {function} [props.onConfirm] - '확인' 버튼 클릭 시 실행될 함수 (버튼이 있으면 표시됨)
 * @param {function} [props.onCancel] - '취소' 버튼 클릭 시 실행될 함수 (버튼이 있으면 표시됨)
 */
const MessageBox = ({
  open,
  onClose,
  type = 'info',
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  // 메시지 타입에 따른 아이콘 및 기본 타이틀 설정
  const getTypeProps = (type) => {
    switch (type) {
      case 'info':
        return { icon: <InfoIcon color="primary" />, defaultTitle: '' };
      case 'alert':
        return { icon: <WarningIcon color="secondary" />, defaultTitle: '' };
      case 'error':
        return { icon: <ErrorIcon color="error" />, defaultTitle: '' };
      case 'success':
        return { icon: <CheckCircleIcon color="success" />, defaultTitle: '' };
      default:
        return { icon: <InfoIcon color="primary" />, defaultTitle: '' };
    }
  };

  const { icon, defaultTitle } = getTypeProps(type);
  const dialogTitle = title || defaultTitle; // title prop이 없으면 defaultTitle 사용

  const handleConfirm = () => {
    onConfirm && onConfirm();
    onClose();
  };

  const handleCancel = () => {
    onCancel && onCancel();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="message-box-title"
      aria-describedby="message-box-description"
      sx={{
        '& .MuiDialog-paper': {
          width: '400px',   
          height: '250px',
          minWidth: '250px', 
          maxWidth: '400px',
          borderRadius: '20px', 
          border: '1px solid',
          borderColor: (theme) => theme.palette.primary.main, 
          padding: '10px',
        }
      }}
    >
      <DialogTitle id="message-box-title" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {icon}
        <Typography variant="h6" component="span" sx={{ fontWeight: 'bold' }}>
          {dialogTitle}
        </Typography>
      </DialogTitle>
      <DialogContent dividers 
        sx={{ 
          flexGrow: 1, 
          overflowY: 'auto',
          display: 'flex',        
          alignItems: 'center',     
          justifyContent: 'center', 
        }}>
        <Typography id="message-box-description" sx={{ whiteSpace: 'pre-wrap' }}>
          {message}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        {onConfirm && (
          <Button onClick={handleConfirm} color="primary" variant="contained">
            <Trans tkey={"COMM.BTN.OK"}/>
          </Button>
        )}
        {onCancel && (
          <Button onClick={handleCancel} color="secondary" variant="outlined">
            <Trans tkey={"COMM.BTN.CANCEL"}/>
          </Button>
        )}
        {(!onConfirm && !onCancel) && ( // 확인/취소 버튼이 모두 없는 경우 "닫기" 버튼
          <Button onClick={onClose} color="primary" variant="contained">
            <Trans tkey={"COMM.BTN.CLOSE"}/>
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default MessageBox;