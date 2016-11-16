import { postSchema } from '../models/post';

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
