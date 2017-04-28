import { PostModel } from '../../models/post';

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
