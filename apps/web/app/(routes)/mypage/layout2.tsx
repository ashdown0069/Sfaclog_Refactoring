// import { MyProfileCard } from '@/components/Profile/MyProfileCard';
// import { getUserById } from '@/utils/getUserData';
// import { auth } from '@/auth/auth';
// import { redirect } from 'next/navigation';
// import { LoadingSpinner } from '@/components/Spinner/LoadingSpinner';
// import type { ExtendedSession } from '@/types/next-auth';
// export default async function Layout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const session: ExtendedSession = await auth();
//   if (!session) return redirect('/login');
//   const user = await getUserById(session.user.userId);
//   if (!user) {
//     return (
//       <div className='main__page mt-20 flex justify-center'>
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   return (
//     <main className='main__page mt-20 flex gap-[83px]'>
//       <MyProfileCard user={user} />
//       {children}
//     </main>
//   );
// }
