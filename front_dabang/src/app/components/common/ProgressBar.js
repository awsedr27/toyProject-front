'use client'
import { Box, Stack, CircularProgress, Typography } from '@mui/material';
import { useLoading } from '@/context/LoadingContext';

export default function ProgressBar({ children }) {
  const { loading } = useLoading();

  if (loading) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(255, 255, 255, 0.56)', 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999, 
        }}
      >
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="10%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--secondary-light-color)" />
            <stop offset="25%" stopColor="var(--secondary-light-color)" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="var(--primary-color)"  stopOpacity="0.8"/>
          </linearGradient>
        </defs>
      </svg>
        <CircularProgress
          variant="indeterminate"
          disableShrink
          size={100}
          thickness={6}
          sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} 
        />
        <Typography variant="h6" component="p" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  return <>{children}</>;
}