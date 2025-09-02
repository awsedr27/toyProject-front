'use client';
import { createContext, useContext, useState , useEffect} from 'react';
import ProgressBar from '@/app/components/common/ProgressBar';
import { usePathname } from 'next/navigation';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();

 useEffect(() => {
   setLoading(true); 
  }, [pathname])
  
  useEffect(() => {
    if (isReady) {
      setTimeout(() => {
        setLoading(false); 
        setIsReady(false);
      }, 500);
    }
  }, [isReady])

  const value = { loading, setLoading, setIsReady };


  return (
    <LoadingContext.Provider value={value}>
        <ProgressBar>{ children }</ProgressBar>
    </LoadingContext.Provider>
  );
};

// Hook 생성: 다른 컴포넌트에서 로딩 상태에 접근할 수 있게 해줍니다.
export const useLoading = () => useContext(LoadingContext);