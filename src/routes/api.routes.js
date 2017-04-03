import { Router } from 'express';
import { signup, signin } from '../controllers/User/sign';

const apiRouter = Router();

apiRouter.get('/', (req, res) => {
  // TODO: implement manual on this api
  res.send('hello its  a root route');
});

apiRouter.post('/signup', signup);

apiRouter.post('/signin', signin);

export default apiRouter;
