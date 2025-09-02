'use client'

import { useEffect, useState } from 'react'
import { useApi } from '@/hooks/useApi'

export default function ProfilePage() {
  const { post } = useApi()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await post('/api/user/info')
        if (data) setProfile(data.data)
      } catch (err) {
        console.error('프로필 불러오기 실패', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [post])

  if (loading) return <p>로딩 중...</p>
  if (!profile) return <p>프로필 정보 없음</p>

  return (
    <div>
      <h1>👤 {profile.nickname} 님</h1>
      <p>이메일: {profile.email}</p>
      <p>가입일: {new Date(profile.createdAt).toLocaleDateString()}</p>
    </div>
  )
}
