'use server';
import { connectDB } from '@/lib/db';
import { auth } from '@/auth/auth';
import { LogModel } from '@/models/Log';

/**
 *
 * @param logId mongodb log id
 * @description 로그 좋아요(like) 버튼 (아이콘은 하트) 클릭시 로그 좋아요 수 증가하거나 감소
 * @returns boolean 성공시 true, 실패시 false
 */

export const handleLogLike = async (logId: string) => {
  const session = await auth();
  try {
    await connectDB();
  } catch (error) {
    return false;
  }

  try {
    const log = await LogModel.findById(logId).exec();
    if (!log) {
      return false;
    }

    //좋아요를 누른 유저가 이미 좋아요를 눌렀다면 좋아요 취소
    if (log.likedUsers.includes(session.user.userId)) {
      log.likes--;
      log.likedUsers = log.likedUsers.filter(
        id => id.toString() !== session.user.userId,
      );
      await log.save();
      return true;
    }
    //좋아요를 누른 유저가 좋아요를 누르지 않았다면 좋아요 추가
    log.likes++;
    log.likedUsers.push(session.user.userId);
    await log.save();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
