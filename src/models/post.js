import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

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
      type: ObjectId,
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
    likes: Number,
    time: Number,
    categories: [String],
    comments: [{
      user: {
        type: ObjectId,
        required: true,
      },
      comment: String,
      created_date: Date,
    }],
    body: String, // TODO: implement rich text data support
}));
