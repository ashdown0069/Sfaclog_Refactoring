'use server';
import React from 'react';
import LoginForm from './LoginForm';
import { GoogleLoginBtn } from './GoogleLoginBtn';

export const Login = () => {
  return (
    <div>
      <LoginForm />
      <GoogleLoginBtn />
    </div>
  );
};
