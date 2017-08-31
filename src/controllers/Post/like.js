import { PostModel } from '../../models/post';
import _ from 'lodash';

export const likePost = (req, res) => {
  const { userId, postId } = req.body;

  PostModel.findOne({ _id: postId }, (err, post) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    }
    const usersWhoLike = [];

    for (let i = 0; i < post.likes.length; i++) {
      usersWhoLike.push(_.toString(post.likes[i]));
    }

    if (_.includes(usersWhoLike, userId)) {
      post.likes.remove(userId);
      post.save();
      res.json({
        isLiked: false,
      });
    } else {
      post.likes.push(userId);
      post.save();
      res.json({
        isLiked: true,
      });
    }
  });
};
