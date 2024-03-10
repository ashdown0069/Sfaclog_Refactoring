import mongoose, { InferSchemaType } from 'mongoose';

const Schema = mongoose.Schema;
export type User = InferSchemaType<typeof UserSchema>;
const UserSchema = new Schema(
  {
    username: { type: String, required: true }, //username === userId
    legalname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nickname: { type: String, required: true, unique: true },
    interests: { type: [String] },
    offers: { type: [String] },
    phone: { type: String, sparse: true, unique: true },
    intro: { type: String },
    avatar: { type: String },
    pageUrl: { type: String, unique: true },
    following: {
      type: [Schema.Types.ObjectId],
      ref: 'UserModel',
      default: [],
    },
    follower: {
      type: [Schema.Types.ObjectId],
      ref: 'UserModel',
      default: [],
    },
    sns: {
      type: Schema.Types.Mixed,
      default: {},
    },
    isVerified: { type: Boolean, default: false },
    verifyToken: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
      sparse: true,
    },
  },
  { timestamps: true },
);

export const UserModel =
  mongoose.models.UserModel || mongoose.model('UserModel', UserSchema);
