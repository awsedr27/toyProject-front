'use client';
import { createContext, useContext, useState } from 'react';
import ProgressBar from '@/app/components/common/ProgressBar';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
        <ProgressBar>{ children }</ProgressBar>
    </LoadingContext.Provider>
  );
};

// Hook 생성: 다른 컴포넌트에서 로딩 상태에 접근할 수 있게 해줍니다.
export const useLoading = () => useContext(LoadingContext);