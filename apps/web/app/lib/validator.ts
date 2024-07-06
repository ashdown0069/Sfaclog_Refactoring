import { LOGS_CATEGORY_LIST } from '@/constant';
import { z } from 'zod';

export const SignupSchema = z
  .object({
    username: z
      .string()
      .min(5, { message: '5자 이상 입력해주세요.' })
      .max(20, { message: '20자 이하로 입력해주세요.' }),
    legalname: z
      .string()
      .min(1, { message: '성함을 입력해주세요.' })
      .transform(value => value.trim()),
    nickname: z
      .string()
      .min(2, { message: '2자 이상 입력해주세요.' })
      .max(12, { message: '12자 이하로 입력해주세요.' })
      .transform(value => value.trim()),
    password: z
      .string()
      .min(1, { message: '비밀번호를 입력해주세요.' })
      // eslint-disable-next-line no-useless-escape
      .regex(/^(?=.*[~!@#$%^&*()_+{}\[\]:;<>,.?~-])(.{8,})$/, {
        message: '8자 이상, 최소한 특수문자가 1개는 포함되어야 합니다',
      }),
    passwordConfirm: z
      .string()
      .min(1, { message: '비밀번호를 한 번 더 입력해주세요.' }),
    email: z
      .string()
      .min(1, { message: '이메일을 입력해주세요' })
      .email({ message: '이메일 형식을 확인해 주세요.' })
      .transform(value => value.trim().toLowerCase()),
  })
  .refine(data => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호 확인이 일치하지 않습니다.',
  });

export const loginSchema = z
  .object({
    username: z.string().min(1, { message: '아이디를 입력해주세요.' }),
    password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
  })
  .required();

export const findPasswordSchema = z.object({
  username: z.string().min(1, { message: '아이디를 입력해주세요.' }),
  email: z
    .string()
    .min(1, { message: '이메일을 입력해주세요' })
    .email({ message: '이메일 형식을 확인해 주세요.' }),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: '비밀번호를 입력해주세요.' })
      // eslint-disable-next-line no-useless-escape
      .regex(/^(?=.*[~!@#$%^&*()_+{}\[\]:;<>,.?~-])(.{8,})$/, {
        message: '8자 이상, 최소한 특수문자가 1개는 포함되어야 합니다',
      }),
    passwordConfirm: z
      .string()
      .min(1, { message: '비밀번호를 한 번 더 입력해주세요.' }),
  })
  .refine(data => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호 확인이 일치하지 않습니다.',
  });

export const CommentSchema = z
  .string()
  .min(1, { message: '댓글을 입력해주세요.' })
  .trim();

export const deleteAccountSchema = z.object({
  reason: z.string().trim().min(1, { message: '탈퇴사유를 선택해주세요.' }),
  password: z
    .string()
    .trim()
    .min(1, { message: '비밀번호를 입력해주세요.' })
    .regex(/^(?=.*[~!@#$%^&*()_+{}\[\]:;<>,.?~-])(.{8,})$/, {
      message: '8자 이상, 최소한 특수문자가 1개는 포함되어야 합니다',
    }),
});

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5;
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];
export const imageFileSchema = z
  .instanceof(File)
  .refine(
    file => {
      return file.size <= MAX_UPLOAD_SIZE;
    },
    { message: '5MB 이하의 이미지 파일을 업로드 해주세요' },
  )
  .refine(
    file => {
      return ACCEPTED_FILE_TYPES.includes(file.type);
    },
    { message: 'jpg, jpeg, png 파일만 업로드 가능합니다.' },
  );

const englishAlphabetRegex = /^[A-Za-z]+$/;
export const profileEditSchema = z.object({
  nickname: z
    .string()
    .trim()
    .min(2, { message: '2자 이상 입력해주세요.' })
    .max(12, { message: '12자 이하로 입력해주세요.' }),
  pageUrl: z
    .string()
    .trim()
    .regex(englishAlphabetRegex, {
      message: '영문자만 사용할 수 있습니다.',
    })
    .min(3, { message: '3자 이상 입력해주세요.' })
    .toLowerCase(),
  intro: z
    .string()
    .max(100, { message: '자기소개는 100자를 초과할 수 없습니다.' }) //백엔드에서 재사용시 유효성검사
    .trim(),
  sns: z
    .array(
      z.object({
        platform: z.string().min(1, { message: 'Select box Error' }), //백엔드에서 재사용시 유효성검사
        url: z.union([
          z.string().url({ message: '올바른 URL 형식이 아닙니다.' }),
          z.literal(''),
        ]),
      }),
    )
    .max(8, { message: 'SNS 계정은 최대 8개까지 입력할 수 있습니다.' }), //백엔드에서 재사용시 유효성검사
  career: z.array(
    z
      .object({
        company: z.union([
          z.string().trim().min(2, '회사명을 입력해주세요'),
          z.literal(''),
        ]),
        position: z.union([
          z.string().trim().min(2, '직책 및 부서명을 입력해주세요'),
          z.literal(''),
        ]),
        startDate: z.date().or(z.string()).nullish(),
        endDate: z.date().or(z.string()).nullish(),
      })
      .superRefine((data, ctx) => {
        if (!data.startDate && (data.company || data.position)) {
          ctx.addIssue({
            path: ['startDate'],
            message: '입사날짜는 필수입력 항목입니다.',
            code: 'custom',
          });
        }

        if (!data.company && (data.startDate || data.position)) {
          ctx.addIssue({
            path: ['company'],
            message: '회사명은 필수입력 항목입니다.',
            code: 'custom',
          });
        }

        if (!data.position && (data.startDate || data.company)) {
          ctx.addIssue({
            path: ['position'],
            message: '직책 및 부서명은 필수입력 항목입니다.',
            code: 'custom',
          });
        }
      }),
  ),
});
export const interestsSchema = z.array(
  z.string().or(
    z
      .string()
      .min(1)
      .refine(val => LOGS_CATEGORY_LIST.includes(val)),
  ),
);
type SignupDataType = z.infer<typeof SignupSchema>;
type LoginInputDataType = z.infer<typeof loginSchema>;
type FindPasswordDataType = z.infer<typeof findPasswordSchema>;
type ResetPasswordDataType = z.infer<typeof resetPasswordSchema>;
type profileEditDataType = z.infer<typeof profileEditSchema>;
export type {
  SignupDataType,
  LoginInputDataType,
  FindPasswordDataType,
  ResetPasswordDataType,
  profileEditDataType,
};
