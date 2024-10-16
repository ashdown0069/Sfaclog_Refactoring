import NextAuth from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { loginSchema } from '@/lib/validator';
import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';

//next-auth 설정
export const config = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      async profile(profile) {
        //디비에 없으면 생성, 있으면 데이터 불러오기
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/login/google`,
          {
            method: 'POST',
            body: JSON.stringify(profile),
          },
        );
        if (!res.ok) return null;
        const result = await res.json();
        if (result.success) {
          profile.userId = result.userId?.toString();
          profile.picture = result.avatar;
          return profile;
        }
        return profile;
      },
    }),
    credentials({
      async authorize(credentials) {
        //로그인 시도시 실행, 권한부여
        try {
          //username, password 유효성검사
          const parsedData = loginSchema.parse(credentials);
          //유저정보 조회
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/login/username`,
            {
              method: 'POST',
              body: JSON.stringify(parsedData),
            },
          );
          if (!res.ok) return null;
          const data = await res.json();
          if (!data.user) return null;
          console.log('data.user', data.user);
          return data.user;
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      //oauth 일 경우 profile 존재, userid가 존재하지 않는다면 로그인 거부
      if (profile && !profile.userId) return false;
      else return true;
    },
    async jwt({ token, user, trigger, profile, session }) {
      if (profile) {
        //token에 추가, 구글 로그인
        token.userId = profile.userId;
        token.image = profile.picture;
        return token;
      }
      if (token && token.email && !token.userId && !profile) {
        //token에 추가 userId 추가
        //@ts-ignore
        token.userId = user.userId;
        return token;
      }
      if (trigger == 'update') {
        // session 업데이트 (닉네임 수정)
        token.name = session.user.name;
        token.image = session.user.image;
        return token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session && !session.user.userId) {
        //token에서 받은 userId를 session에 추가
        session.user.userId = token.userId;
        if (token.image && session) session.user.image = token.image;
      }
      return session;
    },
  },
  session: {
    maxAge: 3 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut } = NextAuth(config);

//타입오류를 찾을수 없어서 any로 설정
export const { auth }: { auth: any } = NextAuth(config);
