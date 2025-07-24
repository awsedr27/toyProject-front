import Joi from 'joi';

export const signUpValidation = Joi.object({
  userId: Joi.string()
    .min(4)
    .max(20)
    .required()
    .messages({
      'string.empty': '아이디는 필수 입력값입니다.',
      'string.min': '아이디는 4자 이상 20자 이하로 입력해주세요.',
      'string.max': '아이디는 4자 이상 20자 이하로 입력해주세요.',
      'any.required': '아이디는 필수 입력값입니다.',
    }),

  password: Joi.string()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$'))
    .required()
    .messages({
      'string.empty': '비밀번호는 필수 입력값입니다.',
      'string.min': '비밀번호는 최소 8자 이상이어야 합니다.',
      'string.pattern.base': '비밀번호는 문자와 특수문자를 포함해야 합니다.',
      'any.required': '비밀번호는 필수 입력값입니다.',
    }),

  name: Joi.string()
    .required()
    .messages({
      'string.empty': '이름은 필수 입력값입니다.',
      'any.required': '이름은 필수 입력값입니다.',
    }),

  email: Joi.string()
    .email()
    .pattern(new RegExp('^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,3}$'))
    .required()
    .messages({
      'string.empty': '이메일은 필수 입력값입니다.',
      'string.email': '이메일 형식이 올바르지 않습니다.',
      'string.pattern.base': '이메일 도메인은 최대 3자리여야 합니다 (예: .com, .net)',
      'any.required': '이메일은 필수 입력값입니다.',
    }),

  phoneNumber: Joi.string()
    .pattern(/^0\d{1,10}$/)
    .required()
    .messages({
      'string.empty': '전화번호는 필수 입력값입니다.',
      'string.pattern.base': '전화번호는 0으로 시작하고 숫자만 포함해야 합니다.',
      'any.required': '전화번호는 필수 입력값입니다.',
    }),

  passwordCk: Joi.string().optional(), // 삭제 예정
});
