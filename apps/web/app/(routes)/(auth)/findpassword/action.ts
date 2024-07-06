'use server';

import { sendResetPasswordEmail } from '@/lib/nodemailer';
import { FindPasswordDataType } from '@/lib/validator';
import { redirect } from 'next/navigation';
//비밀번호 재설정 인증 메일 재전송 로직
export const repeatChangePasswordEmail = async (emailAddress: string) => {
  try {
    const result = await sendResetPasswordEmail(emailAddress);
    if (!result) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const findPasswordAction = async (data: FindPasswordDataType) => {
  //비빌번호 재설정 이메일 보내기
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/findpassword`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (!response.ok) {
    return false;
  }

  return true;
};

// return redirect(`/findpassword/verify?email=${data.email}`);
