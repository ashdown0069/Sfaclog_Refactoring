'use server';
import { connectDB } from '@/lib/db';
import { CommentsModel, IComment } from '@/model/Comments';
import { ILog, LogModel } from '@/model/Log';
import { IUser, UserModel } from '@/model/User';

export async function getAllUsers() {
  try {
    await connectDB();
    const Allusers = await UserModel.find(
      {},
      'id avatar legalname username nickname email pageUrl isVerified isOAuth',
    )
      .lean()
      .exec();
    return JSON.parse(JSON.stringify(Allusers));
  } catch (error) {
    return {};
  }
}

export async function getUserInfo(
  userId: string,
): Promise<{ user: IUser | null; logs: ILog[]; comments: IComment[] }> {
  try {
    await connectDB();
    const user = await UserModel.findById(
      userId,
      '-password -verifyToken -notifications',
    )
      .populate('following', '_id avatar nickname pageUrl')
      .populate('follower', '_id avatar nickname pageUrl')
      .lean()
      .exec();

    const logs = await LogModel.find(
      {
        author: userId,
      },
      '-content -logConentHTML',
    );

    const foundComments = await CommentsModel.find({
      $or: [
        {
          author: userId,
        },
        { 'replies.author': userId },
      ],
    })
      .populate('author', '_id nickname avatar')
      .populate('replies.author', '_id nickname avatar');
    const flatten: any[] = [];
    foundComments.forEach(comment => {
      flatten.push(comment);
      if (comment.replies && comment.replies.length > 0) {
        comment.replies.forEach(reply => {
          if (reply.author.toString() === userId && reply.isDelete === false) {
            flatten.push(reply);
          }
        });
      }
    });
    return JSON.parse(JSON.stringify({ user, logs, comments: flatten }));
  } catch (error) {
    return { user: null, logs: [], comments: [] };
  }
}
