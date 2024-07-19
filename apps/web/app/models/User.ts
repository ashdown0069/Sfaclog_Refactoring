import mongoose, { Schema, Model, Types } from 'mongoose';
require('./Log');
require('./Comments');
export interface ICareer {
  company?: string;
  position?: string;
  startDate?: Date | string | null;
  endDate?: Date | string | null;
}

export interface ISns {
  platform?: string;
  url?: string;
}
export interface IUser {
  _id: string;
  id: string;
  username: string;
  legalname: string;
  email: string;
  password: string;
  nickname: string;
  interests: string[];
  offers: string[];
  phone: string;
  intro: string;
  avatar: string;
  pageUrl: string;
  following: string[];
  follower: string[];
  sns: ISns[];
  career: ICareer[];
  isVerified: boolean;
  verifyToken: Types.ObjectId | null;
  updatedAt: Date | string;
  createdAt: Date | string;
  isDelete: boolean;
  isOAuth: boolean;
}

interface IUserMethods {
  regenToken: () => Types.ObjectId;
}

// eslint-disable-next-line @typescript-eslint/ban-types
type UserModelType = Model<IUser, {}, IUserMethods>;
const UserSchema = new Schema<IUser, UserModelType, IUserMethods>(
  {
    isOAuth: { type: Boolean, default: false },
    isDelete: { type: Boolean, default: false },
    username: { type: String, required: true }, //username === userId
    legalname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, sparse: true },
    nickname: { type: String, required: true, unique: true },
    interests: { type: [String], default: [] },
    offers: { type: [String] },
    phone: { type: String, sparse: true, unique: true },
    intro: { type: String, default: '' },
    avatar: { type: String, default: '' },
    pageUrl: { type: String, unique: true },
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'UserModel',
        default: [],
      },
    ],
    follower: [
      {
        type: Schema.Types.ObjectId,
        ref: 'UserModel',
        default: [],
      },
    ],
    sns: [
      {
        platform: { type: String },
        url: { type: String },
      },
      { default: [] },
    ],
    career: {
      type: [
        {
          company: { type: String, required: true },
          position: { type: String, required: true },
          startDate: { type: Date, required: true },
          endDate: { type: Date, default: null },
        },
      ],
      default: [],
    },
    isVerified: { type: Boolean, default: false },
    verifyToken: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
      sparse: true,
    },
  },
  { timestamps: true, minimize: false },
);

//비밀번호 재설정을 위한 토큰 재발급
UserSchema.methods.regenToken = function regenToken(): Types.ObjectId {
  this.verifyToken = new mongoose.Types.ObjectId();
  this.save();
  return this.verifyToken;
};

export const UserModel =
  (mongoose.models.UserModel as mongoose.Model<
    IUser,
    UserModelType,
    IUserMethods
  >) || mongoose.model<IUser, UserModelType>('UserModel', UserSchema);
