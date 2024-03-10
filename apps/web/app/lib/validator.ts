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
export type SignupDataType = z.infer<typeof SignupSchema>;
