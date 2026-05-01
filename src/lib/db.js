import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const globalForMongoose = global;

globalForMongoose.__mongoose = globalForMongoose.__mongoose || {
  conn: null,
  promise: null,
};

export async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in .env.local');
  }
  if (globalForMongoose.__mongoose.conn) {
    return globalForMongoose.__mongoose.conn;
  }

  if (!globalForMongoose.__mongoose.promise) {
    const options = {
      dbName: process.env.MONGODB_DB || 'nfof-marketplace',
      bufferCommands: false,
    };

    globalForMongoose.__mongoose.promise = mongoose
      .connect(MONGODB_URI, options)
      .then((mongooseInstance) => mongooseInstance);
  }

  globalForMongoose.__mongoose.conn = await globalForMongoose.__mongoose.promise;
  return globalForMongoose.__mongoose.conn;
}

export default connectDB;
