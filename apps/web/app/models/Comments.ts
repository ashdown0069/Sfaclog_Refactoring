import mongoose, { Model, Types } from 'mongoose';
import type { ILog } from './Log';
require('./User');
require('./Log');
const Schema = mongoose.Schema;
export interface IComment {
  _id?: string;
  author: Types.ObjectId;
  log: Types.ObjectId | Pick<ILog, '_id' | 'title'>;
  content: string;
  isDelete?: boolean;
  replies?: IReplyComment[];
  createdAt?: string;
}

// author:
// | Pick<IUser, 'nickname' | 'avatar' | 'createdAt' | '_id'>
// | Types.ObjectId;

export type IReplyComment = Omit<IComment, 'replies' | 'log'>;
type CommentsModelType = Model<IComment>;
const ReplyComment = new Schema<IReplyComment>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'UserModel',
      required: true,
    },
    content: { type: String, required: true },
    isDelete: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const CommentsSchema = new Schema<IComment, CommentsModelType>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'UserModel',
      required: true,
    },
    log: {
      type: Schema.Types.ObjectId,
      ref: 'LogModel',
      required: true,
    },
    content: { type: String, required: true },
    isDelete: { type: Boolean, default: false },
    replies: [ReplyComment],
  },
  { timestamps: true },
);
export const CommentsModel =
  (mongoose.models.CommentsModel as mongoose.Model<
    IComment,
    CommentsModelType
  >) ||
  mongoose.model<IComment, CommentsModelType>('CommentsModel', CommentsSchema);

// export const CommentsModel =
//   (mongoose.models.CommentsModel as Model<IComment, CommentsModelType>) ||
//   mongoose.model<IComment, CommentsModelType>('CommentsModel', CommentsSchema);
