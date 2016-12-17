import { postSchema } from '../models/post';
import { userSchema } from '../models/user';

export function getAllPosts (req, res) {
  postSchema.find({}, (err, posts) => {
    if (err) throw err;
    if (posts.length === 0) {
      res.json({
        success: false,
      });
    } else {
      const usersIds = posts.map(post => post.author);

      userSchema.find({ _id: { $in: usersIds } }, (error, users) => {
        if (error) { console.log(error); }
        const updatedPosts = posts.map((post) => ({
          // TODO: создать свой кастомный ответ клиенту с юзеров в теле поста
        }));
      });
    }
  });
}

export function getPostsByAuthor (req, res) {
  const userID = req.params.id;
  postSchema.find({ author : userID }, (err, posts) => {
    if (err) throw err;
    if (posts.length === 0) {
      res.json({
        success: false,
      });
    } else {
      userSchema.findOne({ _id: userID }, (error, user) => {
        const updatedPosts = posts.map((post) => ({
          id: post._id,
          title: post.title,
          description: post.description,
          author: {
            id: user._id,
            name: user.name,
            image: {
              img_url: user.image.img_url,
              img_type: user.image.img_type,
            },
          },
          time: post.time,
          likes: post.likes,
          created_date: post.created_date,
          updated_date: post.updated_date,
        }));
        res.json({
          success: true,
          posts: updatedPosts,
        });
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
          author: req.body.userId,
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
