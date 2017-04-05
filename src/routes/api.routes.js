import { Router } from 'express';
import { signup, signin } from '../controllers/User/sign';
import { routesProtect } from '../middlewares/routesProtect';

const apiRouter = Router();

apiRouter.post('/signin', signin);

apiRouter.post('/signup', signup);

apiRouter.use(routesProtect);

apiRouter.get('/', (req, res) => {
  res.send('hello its  a private route');
});

export default apiRouter;
