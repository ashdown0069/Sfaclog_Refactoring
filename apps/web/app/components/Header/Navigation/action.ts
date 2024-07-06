'use server';
import { signOut } from '@/auth/auth';

export async function LogoutAction() {
  await signOut({ redirect: true, redirectTo: '/' });
}
