// src/lib/resultCode.js

const resultCodes = {
  SUCCESS: {
    code: 'COM-0000',
    status: 200,
    title: '성공',
    level: 'info',
  },
  UNKNOWN: {
    code: 'COM-9999',
    status: 500,
    title: '알 수 없는 오류',
    level: 'error',
  },
  BAD_REQUEST: {
    code: 'COM-4000',
    status: 400,
    title: '잘못된 요청입니다.',
    level: 'warn',  // 보통 400 에러는 클라이언트 실수라 warning 레벨로 둬요
  },

  // 인증/토큰
  AUTH_INVALID: {
    code: 'AUTH-0001',
    status: 401,
    title: '인증 실패',
    level: 'warn',
  },
  ACCESS_TOKEN_NOT_FOUND: {
    code: 'AUTH-0002',
    status: 401,
    title: '엑세스 토큰이 없습니다.',
    level: 'warn',
  },
  REFRESH_TOKEN_NOT_FOUND: {
    code: 'AUTH-0003',
    status: 401,
    title: '리프레시 토큰이 없습니다.',
    level: 'warn',
  },
  ACCESS_TOKEN_EXPIRED: {
    code: 'AUTH-0004',
    status: 401,
    title: '엑세스 토큰 재발급 요청',
    level: 'warn',
  },

  // 사용자
  USER_NOT_FOUND: {
    code: 'USR-0001',
    status: 409,
    title: '유저가 없습니다',
    level: 'warn',
  },
  USER_DUPLICATE: {
    code: 'USR-0002',
    status: 409,
    title: 'ID가 중복됩니다',
    level: 'warn',
  },
  USER_PASSWORD_INVAILD: {
    code: 'USR-0002',
    status: 409,
    title: '비밀번호가 일치하지 않습니다.',
    level: 'warn',
  },
  USER_INFO_INVAILD: {
    code: 'USR-0002',
    status: 409,
    title: '입력값이 유효하지 않습니다.',
    level: 'warn',
  },
  DB_ERROR: {
    code: 'USR-0003',
    status: 500,
    title: 'DB 처리 오류',
    level: 'error',
  },
  //프로필
  PROFILE_NOT_FOUND: {
    code: 'PRO-0001',
    status: 409,
    title: '프로필이 없습니다',
    level: 'warn',
  },
};

/**
 * 주어진 문자열 코드로 ResultCode 객체 반환 (대소문자 무시)
 * @param {string} code
 * @returns {object}
 */
export function getResultCode(code = '') {
  const key = code.toUpperCase();
  return resultCodes[key] || resultCodes.UNKNOWN;
}

export default resultCodes;
