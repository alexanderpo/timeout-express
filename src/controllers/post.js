import { postSchema } from '../models/post';
import { userSchema } from '../models/user';
import fs from 'fs';
import _ from 'lodash';

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

        let updatedPosts = [];

        for (var i = 0; i < posts.length; i++) {
          const currentPost = posts[i];

          for (var j = 0; j < users.length; j++) {
            const currentUser = users[j];

            if (_.isEqual(currentPost.author, currentUser._id)) {
              const img_url = fs.readFileSync(currentUser.image.img_url);
              const img_type = currentUser.image.img_type;
              const image = new Buffer(img_url).toString('base64');

              const comparedPost = {
                id: currentPost._id,
                title: currentPost.title,
                description: currentPost.description,
                author: {
                  id: currentUser._id,
                  name: currentUser.name,
                  image: {
                    data: 'data:' + img_type + ';base64,' + image,
                    type: img_type,
                  },
                },
                time: currentPost.time,
                likes: currentPost.likes,
                created_date: currentPost.created_date,
                updated_date: currentPost.updated_date,
              };
              updatedPosts.push(comparedPost);
            }
          }
        }
        res.json({
          success: true,
          posts: updatedPosts,
        });
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
        const img_url = fs.readFileSync(user.image.img_url);
        const img_type = user.image.img_type;
        const image = new Buffer(img_url).toString('base64');

        const updatedPosts = posts.map((post) => ({
          id: post._id,
          title: post.title,
          description: post.description,
          author: {
            id: user._id,
            name: user.name,
            image: {
              data: 'data:' + img_type + ';base64,' + image,
              type: img_type,
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
    if (err) { console.log(err); }

    if (posts.length === 0) {
      res.json({
        success: false,
      });
    } else {
      const usersIds = posts.map(post => post.author);

      userSchema.find({ _id: { $in: usersIds } }, (error, users) => {
        if (error) { console.log(error); }

        let updatedPosts = [];

        for (var i = 0; i < posts.length; i++) {
          const currentPost = posts[i];

          for (var j = 0; j < users.length; j++) {
            const currentUser = users[j];

            if (_.isEqual(currentPost.author, currentUser._id)) {
              const img_url = fs.readFileSync(currentUser.image.img_url);
              const img_type = currentUser.image.img_type;
              const image = new Buffer(img_url).toString('base64');

              const comparedPost = {
                id: currentPost._id,
                title: currentPost.title,
                description: currentPost.description,
                author: {
                  id: currentUser._id,
                  name: currentUser.name,
                  image: {
                    data: 'data:' + img_type + ';base64,' + image,
                    type: img_type,
                  },
                },
                time: currentPost.time,
                likes: currentPost.likes,
                created_date: currentPost.created_date,
                updated_date: currentPost.updated_date,
              };
              updatedPosts.push(comparedPost);
            }
          }
        }
        res.json({
          success: true,
          posts: updatedPosts,
        });
      });
    }
  });
  /* postSchema.find({ time: req.body.time }, (err, posts) => {
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
  }); */
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
