import { auth } from '@/auth/auth';
import 'highlight.js/styles/atom-one-dark.css';
import { redirect } from 'next/navigation';
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) return redirect('/login');
  return <>{children}</>;
}
