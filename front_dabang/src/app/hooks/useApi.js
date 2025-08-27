'use client'
import { useRouter } from 'next/navigation'  // Next.js 13 app router 기준
import { useCallback, useState } from 'react'
import api from '../../lib/api'  // axios 인스턴스
import { useLoading } from '@/context/LoadingContext';

export function useApi() {
  const { setLoading } = useLoading();
  const router = useRouter();
  const resultData = null;

  // GET 요청 함수
  const get = useCallback(
    async (url, config) => {
      try {
        setLoading(true);

        const res = await api.get(url, config)
        if (res.data?.routeUrl) {
          router.push(res.data.routeUrl)
        }
        return res.data
      } catch (error) {
        throw error
      } finally {
        setLoading(false);
      }
    },
    [router]
  )

  // POST 요청 함수
  const post = useCallback(
    async (url, data, config) => {
      try {
        setLoading(true);
        
        const res = await api.post(url, data, config)
        resultData = res.data;
        // if (res.data?.routeUrl) {
        //   router.push(res.data.routeUrl)
        // }
        // return res.data
      } catch (error) {
        throw error
      } finally {
        setLoading(false);
      }
      return resultData;
    },
    [router]
  )

  return { get, post}

}
