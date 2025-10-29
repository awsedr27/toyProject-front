"use client"
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CustomBox = styled(Box)(({ theme }) => ({
  padding: '20px',
  margin: '20px',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  textAlign: 'center',
  borderRadius: '20px',
  border: '1px solid',
  borderColor: theme.palette.primary.main, 
}));

