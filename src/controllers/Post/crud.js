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
                updated_at: currentPost.updated_at,
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

export const getAuthorPost = (req, res) => {
  const authorId = req.params.id;

  PostModel.find({ author: authorId }, (err, posts) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    } else if (posts.length === 0) {
        res.json({
          error: 'Вы ещё не создавали записи',
        });
    } else {
      UserModel.findOne({ _id: authorId }, (err, author) => {
        const imageData = new Buffer(readFile(author.image.path)).toString('base64');
        const contentType = !imageData ? '' : author.image.contentType;
        const image = contentType + imageData;

        if (err) {
          res.status(500).json({
            error: err,
          });
        }

        const collectedPosts = posts.map((post) => ({
          id: post._id,
          title: post.title,
          description: post.description,
          author: {
            id: author._id,
            name: author.name,
            email: author.email,
            image: image,
          },
          likes: post.likes,
          categories: post.categories,
          created_at: post.created_at,
          updated_at: post.updated_at,
        }));

        res.json({
          posts: collectedPosts,
        });
      });
    }
  });
};
