import { Router } from 'express';
import { signup, signin } from '../controllers/User/sign';
import { updateUser } from '../controllers/User/update';
import { routesProtect } from '../middlewares/routesProtect';
import { createPost } from '../controllers/Post/crud';

const apiRouter = Router();

apiRouter.post('/signin', signin);

apiRouter.post('/signup', signup);

apiRouter.use(routesProtect);

apiRouter.put('/profile/:id', updateUser);

apiRouter.post('/posts/create', createPost);

apiRouter.get('/', (req, res) => {
  res.send('hello its  a private route');
});

export default apiRouter;
