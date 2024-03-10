import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EmailVerificationSchema = new Schema(
  {
    email: { type: String, required: true },
    token: { type: String, required: true },
  },
  { timestamps: true },
);

export const EmailVerificationModel =
  mongoose.models.EmailVerificationModel ||
  mongoose.model('EmailVerificationModel', EmailVerificationSchema);
