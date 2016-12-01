import { postSchema } from '../models/post';

export function getAllPosts (req, res) {
  postSchema.find({}, (err, posts) => {
    if (err) throw err;
    if (posts.length != 0) {
      res.json({
        success: true,
        posts: posts,
      });
    } else {
      res.json({
        success: false,
      });
    }
  });
}

export function getPostsByAuthor (req, res) {
  postSchema.find({ author: req.body.username }, (err, posts) => {
    if (err) throw err;
    if (posts.length != 0) {
      res.json({
        success: true,
        posts: posts,
      });
    } else {
      res.json({
        success: false,
      });
    }
  });
}

export function getSearchResult (req, res) {
  postSchema.find({ time: req.body.time }, (err, posts) => {
    if (err) throw err;
    if (posts.length != 0) {
      res.json({
        success: true,
        posts: posts,
      });
    } else {
      res.json({
        success: false,
      });
    }
  });
}

export function createPost (req, res) {
  postSchema.findOne({ title: req.body.title }, (err, post) => {
    if (err) throw err;
    if (post) {
      res.json({
        success: false,
        message: 'Post with this name already created!',
      });
    } else {
        const post = new postSchema({
          title: req.body.title,
          description: req.body.description,
          author: req.body.user,
          time: req.body.time,
        });

        post.save((err) => {
          if (err) throw err;
          console.log('Post saved successfully!');
          res.json({
            success: true,
            message: 'Your post created!',
          });
        });
    }
  });
}
