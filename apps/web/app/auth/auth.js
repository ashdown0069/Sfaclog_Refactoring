import { connectDB } from '@/lib/db';
import NextAuth from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { UserModel } from '@/models/User';
import { z } from 'zod';
import bcrypt from 'bcrypt';
const loginSchema = z.object({
  username: z.string({
    required_error: '아이디는 필수 입력 항목입니다.',
    invalid_type_error: '아이디는 문자열이어야 합니다.',
  }),
  password: z.string({
    required_error: '비밀번호는 필수 입력 항목입니다.',
    invalid_type_error: '비밀번호는 문자열이어야 합니다.',
  }),
});

// declare module 'next-auth' {
//   interface Session extends DefaultSession {
//     user: {
//       email: string;
//       id: string;
//       image: string;
//       name: string;
//     };
//   }
// }

// interface credentialsType {
//   email: string;
//   password: string;
// }

// interface User {
//   id: string;
//   name: string;
//   email: string;
// }
// // authorize credentials param = {
// //   username: 'username',
// //   password: 'password',
// // }
export const config = {
  providers: [
    credentials({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        //로그인 시도시 실행, 권한부여
        await connectDB();
        console.log(credentials);
        //username, password 입력값 검증
        let username, password;
        try {
          const parsedData = loginSchema.parse(credentials);
          username = parsedData.username;
          password = parsedData.password;
        } catch (e) {
          console.log(e);
          return null;
        }

        // console.log('parse ==', username, password);
        try {
          const foundUser = await UserModel.findOne({
            username: username,
          })
            .lean()
            .exec();

          if (foundUser) {
            const isPasswordMatch = await bcrypt.compare(
              password,
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
          console.log(e);
        }
        return null;
      },
    }),
  ],
  callbacks: {},
  secret: process.env.AUTH_SECRET,
};

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
