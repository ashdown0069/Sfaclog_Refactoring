import mongoose from 'mongoose';
declare global {
  // eslint-disable-next-line no-var
  var mongoose: any; // This must be a `var` and not a `let / const`
}
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose
      .connect(
        'mongodb+srv://first-user:950309@cluster0.fpcnqmg.mongodb.net/sfaclog',
        opts,
      )
      .then(mongoose => {
        return mongoose;
      });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};
