import { connectDB } from '@/lib/db';
import NextAuth from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

import { loginSchema } from '@/lib/validator';
import type { NextAuthConfig } from 'next-auth';
import { getUserByEmail, getUserByUsername } from '@/utils/getUserData';
import Google from 'next-auth/providers/google';
import { OAtuh } from './OAtuh';
// declare module 'next-auth' {
//   interface User {
//     /** The user's postal address. */
//     address: string;
//   }
// }

//next-auth 설정
export const config = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      async profile(profile) {
        //디비에 없으면 생성, 있으면 데이터 불러오기
        const result = await OAtuh(profile);
        if (result.success) {
          // mongodb id, avatar 를 디비에서 불러옴
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
          await connectDB();
        } catch (e) {
          return null;
        }
        try {
          //username, password 유효성검사
          const parsedData = loginSchema.parse(credentials);
          //유저정보 조회
          const foundUser = await getUserByUsername(parsedData.username);
          //유저정보가 존재하고, 비밀번호가 일치하면 유저정보 반환
          if (foundUser) {
            const isPasswordMatch = await bcrypt.compare(
              parsedData.password,
              foundUser.password,
            );
            if (isPasswordMatch) {
              return {
                name: foundUser.nickname,
                email: foundUser.email,
                image: foundUser.avatar || '/images/Avatar.png',
              };
            }
          }
        } catch (e) {
          return null;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      //oauth 일 경우 profile 존재, userid가 존재하지 않는다면 로그인 거부
      if (profile && !profile.userId) return false;
      else return true;
    },
    async jwt({ token, trigger, profile, session }) {
      if (profile) {
        token.userId = profile.userId;
        token.image = profile.picture;
        // console.log('jwt callback profile', profile);
        // console.log('jwt callback token', profile);
        return token;
      }
      if (token && token.email && !token.userId && !profile) {
        //mongoDB에서 _id를 가져와서 token에 추가
        const foundUser = await getUserByEmail(token.email);
        token.userId = foundUser?.id;
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
