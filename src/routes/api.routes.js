import { Router } from 'express';
import { routesTokenProtect } from '../middlewares/routesTokenProtect';
import { authenticate, registration, updateInformation } from '../controllers/user';
import {
  createPost,
  getAllPosts,
  getSearchResult,
  getPostsByAuthor,
  likePost,
} from '../controllers/post';

const apiRouter = Router();

apiRouter.post('/authenticate', authenticate );

apiRouter.post('/registration', registration );

apiRouter.use(routesTokenProtect);

apiRouter.put('/profile/:id', updateInformation);

apiRouter.get('/posts', getAllPosts);

apiRouter.get('/posts-by-author/:id', getPostsByAuthor);

apiRouter.post('/posts/search', getSearchResult);

apiRouter.post('/post/create', createPost);

apiRouter.post('/posts/:id/like', likePost);

export default apiRouter;
