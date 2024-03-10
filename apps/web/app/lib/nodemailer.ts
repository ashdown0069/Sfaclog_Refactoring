'use server';

import nodemailer from 'nodemailer';
import { UserModel } from '@/models/User';
import { connectDB } from './db';
export const sendVerificationEmail = async (email: string, token?: string) => {
  if (!token) {
    //재전송 로직, 토큰이 없다면 db에서 가져오기
    try {
      await connectDB();
    } catch (err) {
      return false;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const foundUser = await UserModel.findOne({ email: email });
    if (!foundUser) return false; // 유저가 없다면
    token = foundUser.verifyToken?.toString();
    console.log('get token from db =', token, foundUser);
  }
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // 이메일
      auth: {
        user: process.env.MAIL_ID, // 발송자 이메일
        pass: process.env.MAIL_PASSWORD, // 발송자 비밀번호
      },
    });
    await transporter.sendMail({
      from: {
        name: 'Sfaclog',
        address: process.env.MAIL_ID as string,
      }, // 발송자 이메일
      to: email, // 수신자 이메일
      subject: '[Sfaclog] 이메일 인증을 완료해주세요', // 제목

      html: `
        <p>[Sfaclog]에 가입 해주셔서 감사합니다.</p>
        <br/>
        <p>밑에있는 확인하기 버튼을 클릭하여 이메일 인증을 완료해주세요.</p>
        <br/>
        <p>
        <a href="${process.env.NEXT_PUBLIC_BASE_URL}/api/user/signup/verify?token=${token}" target="_blank" rel="noopener">확인하기</a>
        </p>
        <br/>
        <p>감사합니다</p>
        <br/>
        <p>Sfaclog 드림</p>
        `,
    });
  } catch (err) {
    return false;
  }
  return true;
};
