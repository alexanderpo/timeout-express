import { PostModel } from '../../models/post';
import { UserModel } from '../../models/user';
import { readFile } from '../../utils/fileParser';
import _ from 'lodash';

export const createPost = (req, res) => {
  const { title, categories, description, author } = req.body;

  PostModel.findOne({ title: title }, (err, post) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    } else if (post) {
      res.json({
        error: 'Запись с таким заголовком уже существует',
      });
    } else {
      const post = new PostModel({
        title: title,
        categories: categories,
        description: description,
        author: author,
        likes: [],
      });

      post.save((err) => {
        if (err) {
          res.status(500).json({
            error: err,
          });
        }
        res.status(200).json({});
      });
    }
  });
};

export const getPosts = (req, res) => {
  PostModel.find({}, (err, posts) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    } else if (posts.length === 0) {
      res.json({
        error: 'Пока ещё записей не создано',
      });
    } else {
      const usersIds = posts.map(post => post.author);

      UserModel.find({ _id: { $in: usersIds } }, (err, users) => {
        if (err) {
          res.status(500).json({
            error: err,
          });
        }

        let collectedPosts = [];

        for (var i = 0; i < posts.length; i++) {
          const currentPost = posts[i];

          for (var j = 0; j < users.length; j++) {
            const currentUser = users[j];

            if (_.isEqual(currentPost.author, currentUser._id)) {
              const imageData = new Buffer(readFile(currentUser.image.path)).toString('base64');
              const contentType = !imageData ? '' : currentUser.image.contentType;
              const image = contentType + imageData;

              const comparedPost = {
                id: currentPost._id,
                title: currentPost.title,
                description: currentPost.description,
                author: {
                  id: currentUser._id,
                  name: currentUser.name,
                  email: currentUser.email,
                  image: image,
                },
                likes: currentPost.likes,
                categories: currentPost.categories,
                created_at: currentPost.created_at,
              };
              collectedPosts.push(comparedPost);
            }
          }
        }
        res.json({
          posts: collectedPosts,
        });
      });
    }
  });
};
