import { useRouter } from 'next/navigation'  // Next.js 13 app router 기준
import { useCallback } from 'react'
import callInternalApi from '../lib/callInternalApi'  // axios 인스턴스

export function useApi() {
  const router = useRouter()

  // GET 요청 함수
  const get = useCallback(
    async (url, config = {}) => {
      try {
        const res = await callInternalApi.get(url, config)
        if (res.data?.routeUrl) {
          router.push(res.data.routeUrl)
          return null
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
