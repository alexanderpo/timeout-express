import { Router } from 'express';
import { signup, signin } from '../controllers/User/sign';
import { updateUser } from '../controllers/User/update';
import { routesProtect } from '../middlewares/routesProtect';
import {
  createPost,
  getPosts,
  getAuthorPost,
  removePost,
  editPost,
  getLatestsPosts,
} from '../controllers/Post/crud';
import { likePost } from '../controllers/Post/like';

const apiRouter = Router();

apiRouter.post('/signin', signin);

apiRouter.post('/signup', signup);

apiRouter.use(routesProtect);

apiRouter.put('/profile/:id', updateUser);

apiRouter.get('/posts', getPosts);

apiRouter.get('/posts/latest', getLatestsPosts);

apiRouter.get('/users/:id/posts', getAuthorPost);

apiRouter.post('/posts/create', createPost);

apiRouter.post('/posts/:id/like', likePost);

apiRouter.delete('/posts/remove/:id', removePost);

apiRouter.put('/posts/:id/edit', editPost);

apiRouter.get('/', (req, res) => {
  res.send('hello its  a private route');
});

export default apiRouter;
