'use server';
import { signIn } from '@/auth/auth';
import type { LoginInputDataType } from '@/lib/validator';

export async function submitAction(data: LoginInputDataType) {
  try {
    await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    });
    return true;
  } catch (err) {
    return false;
  }
}
