import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const UserModel = mongoose.model('User', new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  hash: { type: String, required: true },
  image: { data: Buffer, contentType: String },
}));
