import mongoose, { Schema, Model } from 'mongoose';
import type { IUser } from './User';
import { IComment } from './Comments';
require('./Comments');
require('./User');
export interface ILog {
  _id: string;
  author: Partial<IUser>;
  title: string;
  tags: string[];
  thumbnail: string;
  content: any;
  logConentHTML: string;
  isVisibility: boolean;
  blogVisibility: 'public' | 'private';
  isDelete: boolean;
  likedUsers: string[];
  likes: number;
  views: number;
  comments: IComment[];
  category: string;
  updatedAt: Date;
  createdAt: Date;
}
type LogModelType = Model<ILog>;
const LogSchema = new Schema<ILog, LogModelType>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'UserModel',
      required: true,
    },
    title: { type: String, required: true },
    tags: { type: [String] },
    thumbnail: { type: String, default: '' },
    content: { type: Schema.Types.Mixed, required: true },
    logConentHTML: { type: String, default: '' },
    isVisibility: { type: Boolean, required: true },
    isDelete: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    likedUsers: [{ type: Schema.Types.ObjectId, ref: 'UserModel' }],
    likes: { type: Number, default: 0 },
    comments: [{ type: Schema.Types.ObjectId, ref: 'CommentsModel' }],
    category: { type: String, required: true },
  },
  { timestamps: true },
);
LogSchema.index({ title: 'text', content: 'text' });
export const LogModel =
  (mongoose.models.LogModel as Model<ILog, LogModelType>) ||
  mongoose.model<ILog, LogModelType>('LogModel', LogSchema);
