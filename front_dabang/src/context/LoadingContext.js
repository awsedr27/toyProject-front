'use client';
import { createContext, useContext, useState , useEffect, useRef } from 'react'; // useRef 추가
import ProgressBar from '@/app/components/common/ProgressBar';
import { usePathname } from 'next/navigation';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
 // const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();
 // const lastPathname = useRef(pathname); 

  // useEffect(() => {
    
  //   if (pathname !== lastPathname.current) {
  //     setLoading(true);
  //     setIsReady(false);
  //   }
    
    
  //   lastPathname.current = pathname;
  // }, [pathname]);

  // useEffect(() => {
  //   if (isReady) {
  //     setLoading(false);
  //   }
  // }, [isReady]);

  const value = { loading, setLoading
    //,setIsReady 
  };

  return (
    <LoadingContext.Provider value={value}>
      <ProgressBar />
      {children}
    </LoadingContext.Provider>
  );
};

// Hook 생성: 다른 컴포넌트에서 로딩 상태에 접근할 수 있게 해줍니다.
export const useLoading = () => useContext(LoadingContext);