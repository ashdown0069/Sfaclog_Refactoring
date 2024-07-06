'use server';

import { connectDB } from '@/lib/db';
import { UserModel } from '@/models/User';
import { revalidatePath, revalidateTag } from 'next/cache';

export const handleFollow = async (
  isFollowing: boolean,
  userId: string,
  authorId: string,
) => {
  console.log('ids = ', userId, authorId);
  try {
    await connectDB();
    const user = await UserModel.findOne({ _id: userId }).exec();
    const authorUser = await UserModel.findOne({ _id: authorId }).exec();
    console.log('server action = ', user, authorUser);
    if (user && authorUser) {
      if (isFollowing) {
        user.following = user.following.filter(
          id => id.toString() !== authorId,
        );
        authorUser.follower = authorUser.follower.filter(
          id => id.toString() !== userId,
        );
      } else {
        user.following.push(authorId);
        authorUser.follower.push(userId);
      }

      await user.save();
      await authorUser.save();
    }
    revalidateTag('follow');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
