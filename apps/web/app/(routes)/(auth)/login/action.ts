'use server';
import { signIn } from '@/auth/auth';
import { LoginInputType } from './components/LoginForm';

export async function submitAction(data: LoginInputType) {
  return { loginSuccess: false };
  // try {
  //   await signIn('credentials', {
  //     email: data.email,
  //     password: data.password,
  //     redirect: false,
  //   });
  //   return { loginSuccess: true };
  // } catch (err) {
  //   return { loginSuccess: false };
  // }
}
