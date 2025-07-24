'use client';

import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import {setupI18n } from '@/lib/i18n';

export default function I18nProvider({ children, initialI18nStore }) {
  const [i18nInstance, setI18nInstance] = useState(null);
  const [isI18nReady, setIsI18nReady] = useState(false); // i18n 준비 상태

  useEffect(() => {
    // 1. 서버에서 전달받은 initialState로 i18n 인스턴스 설정
    const instance = setupI18n(initialI18nStore);
    setI18nInstance(instance);

    // 2. i18n 초기화 Promise가 완료될 때까지 대기
    instance.initPromise.then(() => {
      setIsI18nReady(true);
    }).catch(error => {
      console.error('i18n initialization failed:', error);
      // 오류 발생 시에도 최소한의 UI를 보여줄 수 있도록 처리
      setIsI18nReady(true);
    });

    // 클라이언트 전용 언어 감지기를 여기서 추가할 수도 있습니다.
    // 만약 LanguageDetector를 사용한다면:
    // instance.use(require('i18next-browser-languagedetector')).init({ /* ... */ });

  }, [initialI18nStore]); // initialI18nStore가 변경될 때마다 재실행

  if (!isI18nReady || !i18nInstance) {
    // i18n이 아직 준비되지 않았다면 로딩 상태를 표시
    // 서버에서는 이 조건이 true가 되지 않으므로 Hydration Error를 유발하지 않습니다.
    return <div>Loading translations...</div>;
  }

  return (
    <I18nextProvider i18n={i18nInstance}>
      {children}
    </I18nextProvider>
  );
}