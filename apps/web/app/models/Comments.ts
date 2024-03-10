import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReplyComment = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'UserModel',
      required: true,
    },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const CommentsSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'UserModel',
      required: true,
    },
    content: { type: String, required: true },
    replies: [ReplyComment],
    likes: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.models.comment ||
  mongoose.model('Comment', CommentsSchema);
