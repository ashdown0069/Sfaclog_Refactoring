import NextAuth from 'next-auth';
import type { DefaultSession, NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import github from 'next-auth/providers/github';
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      email: string;
      id: string;
      image: string;
      name: string;
    };
  }
}

interface credentialsType {
  email: string;
  password: string;
}

export const config = {
  providers: [
    credentials({
      async authorize(credentials: credentialsType) {
        const user = { id: '1', name: 'test', email: 'test@test.com' };
        if (!user || !credentials) return null;
        return user;
      },
    }),
  ],
  callbacks: {},
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

// callbacks: {
//   // async jwt({ token, trigger, account, user, profile, session }) {
//   //   // console.log('TOKEN =', token);
//   //   // console.log('session =', session);
//   //   // console.log('Account =', account);
//   //   // console.log('User= ', user);
//   //   // console.log('profile= ', profile);
//   //   if (trigger === 'update' && session.name && session.image) {
//   //     // session 업데이트 (닉네임 수정)
//   //     token.name = session.name;
//   //     token.image = session.image;
//   //     token.picture = session.image;
//   //   }
//   //   return {
//   //     ...token,
//   //     ...user,
//   //   };
//   // },
//   session({ session, token }) {
//     // if (token && session) {
//     //   session.user.id = token.id;
//     //   session.user.email = token.email;
//     //   session.user.image = token.image;
//     // }
//     return session;
//   },
// },
