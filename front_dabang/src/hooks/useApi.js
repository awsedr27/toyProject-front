import { useCallback } from 'react'
import callInternalApi from '../lib/callInternalApi'  // axios 인스턴스
import { useRouter } from 'next/navigation';
import { useLoading } from '@/context/LoadingContext';


export function useApi() {
  const router = useRouter();
  const { loading, setLoading } = useLoading(); 

  // GET 요청 함수
  const get = useCallback(
    async (url, config = {}) => {
      try {
        const res = await callInternalApi.get(url, config)

        if (res.data?.routeUrl) {
          router.push(res.data.routeUrl)
          return null
        }else{
          setLoading(false);
        }
        return res.data
      } catch (error) {
        throw error
      }
    },
    [router]
  )

  // POST 요청 함수
  const post = useCallback(
    async (url, data, config = {}) => {
      try {
        const res = await callInternalApi.post(url, data, config)
        if (res.data?.routeUrl) {
          router.push(res.data.routeUrl)
          return null
        }else{
          setLoading(false);
        }
        return res.data
      } catch (error) {
        throw error
      }
    },
    [router]
  )

  return { get, post }
}
