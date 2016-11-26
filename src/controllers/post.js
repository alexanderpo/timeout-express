import { postSchema } from '../models/post';
import { userSchema } from '../models/user';

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

function getUserNameById (id) {
  userSchema.findById(id, 'name -_id', (err, user) => {
    if (err) throw err;
    console.log(user.name);
  });
}

export function getTimeSearchResult (req, res) {
  postSchema.find({ time: req.body.time }, (err, posts) => {
    if (err) throw err;
    if (posts.length != 0) {
      res.json({
        success: true,
        posts: posts,
      });
      /* res.json({
        success: true,
        posts: posts,
      }); */
    } else {
      res.json({
        success: false,
      });
    }
  });
}

export function createFirstStep (req, res) {
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
          category: req.body.category,
          author: req.body.user,
          time: req.body.time,
        });

        post.save((err) => {
          if (err) throw err;
          console.log('Post saved successfully!');
          res.json({
            success: true,
            message: 'First part of post created!',
          });
        });
    }
  });
}

export function createSecondStep (req, res) {

}
