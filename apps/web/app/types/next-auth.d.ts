import { Session } from 'next-auth';

export interface ExtendedSession extends Session {
  user: {
    userId: string;
  } & Session['user'];
}
declare module 'next/server' {
  interface NextRequest {
    auth?: ExtendedSession;
  }
}
