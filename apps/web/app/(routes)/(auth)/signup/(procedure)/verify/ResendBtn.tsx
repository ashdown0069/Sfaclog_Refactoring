'use client';
import { sendVerificationEmail } from '@/lib/nodemailer';
import { BoxButton } from '@repo/ui/Button';
import React from 'react';

export function ResendBtn({ emailAddress }: { emailAddress: string }) {
  return (
    <BoxButton
      type='button'
      style='solid'
      size='large'
      onClick={async () => {
        if (emailAddress) {
          const result = await sendVerificationEmail(emailAddress);
          if (result) alert('이메일이 재전송 되었습니다.');
          else alert('이메일 재전송에 실패 하였습니다');
        }
      }}
    >
      재전송하기
    </BoxButton>
  );
}
