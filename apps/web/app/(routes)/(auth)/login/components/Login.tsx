import React from 'react';
import LoginForm from './LoginForm';
import { GoogleLoginBtn } from './GoogleLoginBtn';
import { KakaoLoginBtn } from './KakaoLoginBtn';
import { NaverLoginBtn } from './NaverLoginBtn';

export const Login = () => {
  return (
    <div>
      <LoginForm />
      <div className='flex flex-col gap-2'>
        <GoogleLoginBtn />
        <KakaoLoginBtn />
        <NaverLoginBtn />
      </div>
    </div>
  );
};
