import { useRouter } from 'next/navigation'  // Next.js 13 app router 기준
import { useCallback } from 'react'
import callInternalApi from '../lib/callInternalApi'  // axios 인스턴스
import {useLoading} from '@/context/LoadingContext'  

export function useApi() {
  const router = useRouter()
 const { loading, setLoading } = useLoading();
  // GET 요청 함수
  const get = useCallback(
    async (url, config = {}) => {
      try {
        setLoading(true);
        const res = await callInternalApi.get(url, config)
        if (res.data?.routeUrl) {
          router.push(res.data.routeUrl)
          return null
        }
        return res.data
      } catch (error) {
        throw error
      }finally{
        setLoading(false);
      }
    },
    [router]
  )

  // POST 요청 함수
  const post = useCallback(
    async (url, data, config = {}) => {
      try {
        //setLoading(true);
        console.log('api진입')
        const res = await callInternalApi.post(url, data, config)
        console.log('api이후')
        if (res.data?.routeUrl) {
          router.push(res.data.routeUrl)
          return null
        }
        return res.data
      } catch (error) {
        throw error
      }finally{
        console.log('finally실행')
       // setLoading(false);
      }
    },
    [router]
  )

  return { get, post }
}