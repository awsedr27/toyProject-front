'use client'
import { Stack, CircularProgress, circularProgressClasses } from '@mui/material';
import { useLoading } from '@/context/LoadingContext';

export default function ProgressBar({ children }) {
 const { loading } = useLoading();

  return loading ? (
        <>
        <p>Loading...</p>
        <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={(theme) => ({
            color: theme.palette.secondary.light,
            animationDuration: '550ms',
            position: 'absolute',
            [`& .${circularProgressClasses.circle}`]: {
                strokeLinecap: 'round',
            },
        })}
        size={300}
        thickness={7}
        />
        </>
        ) 
        : (<>
            {children}
          </>);
}
