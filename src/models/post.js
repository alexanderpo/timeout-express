import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const UserID = Schema.ObjectId;

export const postSchema = mongoose.model('Post', new Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: UserID,
      required: true,
    },
    created_date: {
      type: Date,
      default: Date.now,
    },
    updated_date: {
      type: Date,
      default: Date.now,
    },
    time: {
      type: Number,
      required: true,
    },
    likes: [UserID],
}));
