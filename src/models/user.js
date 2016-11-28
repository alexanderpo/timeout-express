import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const userSchema = mongoose.model('User', new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
    meta: [{
      about: String,
      raiting: Number,
    }],
}));
