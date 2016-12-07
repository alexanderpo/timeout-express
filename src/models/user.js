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
    image: {
      img_url: {
        type: String,
        default: 'public/users/images/default.png',
      },
      img_type: {
        type: String,
        default: 'image/png',
      }
    },
}));
