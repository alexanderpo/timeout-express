import { Router } from 'express';
import { routesTokenProtect } from '../middlewares/routesTokenProtect';
import { authenticate, registration } from '../controllers/user';
import {
  createPost,
  getAllPosts,
  getSearchResult,
} from '../controllers/post';

const apiRouter = Router();

apiRouter.post('/authenticate', authenticate );

apiRouter.post('/registration', registration );

apiRouter.use(routesTokenProtect);

apiRouter.get('/posts', getAllPosts);

apiRouter.post('/posts/search', getSearchResult);

apiRouter.post('/post/create', createPost);

export default apiRouter;
