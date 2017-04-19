import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

export const PostModel = mongoose.model('Post', new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: ObjectId, required: true },
  created_at: { type: Date, default: Date.now(), required: true },
  likes: [ObjectId],
}));
