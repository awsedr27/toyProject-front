import { Pool } from 'pg'
import resultCodes from '@/lib/resultCode'
import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'

import crypto from 'crypto'
import {withTransaction} from "@/lib/db";

// 랜덤 비밀번호 생성 함수 (조건: 영문자 1개 이상, 특수문자 1개 이상, 총 8자리 이상)
function generateValidPassword() {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const special = '!@#$%^&*(),.?":{}|<>'
  const all = letters + special + '0123456789'

  const getRandomChar = (chars) => chars[Math.floor(Math.random() * chars.length)]

  let password = ''

  password += getRandomChar(letters)
  password += getRandomChar(special)

  for (let i = 0; i < 6; i++) {
    password += getRandomChar(all)
  }

  return password.split('').sort(() => 0.5 - Math.random()).join('')
}

export async function POST(req) {
  try {
    const body = await req.json()
    const { userId, email } = body

    if (!userId || !email) {
      return new Response(JSON.stringify(resultCodes.BAD_REQUEST), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return await withTransaction(async (client) => {
      // 1. 사용자 확인
      const userResult = await client.query(
          'SELECT user_id FROM users WHERE user_id = $1 AND email = $2',
          [userId, email]
      )

      if (userResult.rows.length === 0) {
        return new Response(JSON.stringify(resultCodes.USER_NOT_FOUND), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      // 2. 랜덤 비밀번호 생성 및 해시
      const newPassword = generateValidPassword()
      const hashedPassword = await bcrypt.hash(newPassword, 10)

      // 3. 비밀번호 업데이트
      await client.query(
          'UPDATE users SET password = $1 WHERE user_id = $2',
          [hashedPassword, userId]
      )

      // 4. 이메일 전송 준비 및 발송
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      })

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: '[비밀번호 초기화 안내]',
        html: `
          <p>${userId}님, 요청하신 비밀번호가 초기화되었습니다.</p>
          <p>임시 비밀번호: <strong>${newPassword}</strong></p>
          <p>로그인 후 반드시 비밀번호를 변경해주세요.</p>
        `,
      }

      await transporter.sendMail(mailOptions)

      return new Response(JSON.stringify(resultCodes.SUCCESS), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    })
  } catch (error) {
    console.error('[POST /api/user/reset/password]', error)
    return new Response(JSON.stringify(resultCodes.UNKNOWN), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

