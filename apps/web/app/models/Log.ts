import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const LogSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'UserModel',
      required: true,
    },
    title: { type: String, required: true },
    tags: { type: [String] },
    thumbnail: { type: String, required: true },
    content: { type: String, required: true },
    visibility: { type: Boolean, required: true },
    series: { type: String, required: true },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.models.LogModel ||
  mongoose.model('LogModel', LogSchema);
