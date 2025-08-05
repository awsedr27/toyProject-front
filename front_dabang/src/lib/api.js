import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  withCredentials: true, // httpOnly 쿠키 포함 자동 전송
  headers: {
    'Content-Type': 'application/json',
  },
})

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else {
      resolve(token)
    }
  })
  failedQueue = []
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config

    if (
      error.response?.data?.status === 401 &&
      error.response?.data?.code === 'AUTH-0004' &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      return new Promise((resolve, reject) => {
        api
          .post('/api/auth/refresh') // 리프레시 토큰으로 액세스 토큰 재발급 API 호출
          .then((res) => {
            // 재발급 성공 시 재시도 호출
            processQueue(null)
            resolve(api(originalRequest))
          })
          .catch((err) => {
            processQueue(err)
            reject(err)
          })
          .finally(() => {
            isRefreshing = false
          })
      })
    }

    return Promise.reject(error)
  }
)

export default api
