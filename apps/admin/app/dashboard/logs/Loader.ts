import { connectDB } from '@/lib/db';
import { CommentsModel } from '@/model/Comments';
import { ILog, LogModel } from '@/model/Log';
import { comment } from 'postcss';

export async function getAllLogs() {
  try {
    await connectDB();
    const Allusers = await LogModel.find(
      {},
      'id author title category likes views isVisibility',
    )
      .populate('author', 'id nickname')
      .lean()
      .exec();
    return JSON.parse(JSON.stringify(Allusers));
  } catch (error) {
    return [];
  }
}

interface getLogInfoReturn {
  log: ILog | null;
  commentUsers: any[];
}

export async function getLogInfo(
  logId: string,
): Promise<getLogInfoReturn | null> {
  try {
    await connectDB();

    const log = await LogModel.findById(logId)
      .populate('author', '_id nickname avatar')
      .populate('likedUsers', '_id nickname avatar pageUrl')
      .exec();

    if (!log) {
      return null;
    }
    const foundComments = await CommentsModel.find({
      log: log._id,
    })
      .populate('author', '_id nickname avatar')
      .populate('replies.author', '_id nickname avatar');

    const flatten: any[] = [];
    foundComments.forEach(comment => {
      flatten.push(comment);
      if (comment.replies && comment.replies.length > 0) {
        comment.replies.map((reply: any) => {
          flatten.push(reply);
        });
      }
    });

    log.comments = foundComments;
    return JSON.parse(JSON.stringify(log));
  } catch (error) {
    return null;
  }
}
