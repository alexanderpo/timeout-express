import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

export const UserModel = mongoose.model('User', new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  hash: { type: String, required: true },
  liked_posts: [ObjectId],
  image: { data: Buffer, contentType: String },
}));
