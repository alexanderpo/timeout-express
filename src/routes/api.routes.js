import { Router } from 'express';
import { routesTokenProtect } from '../middlewares/routesTokenProtect';
import { authenticate, registration } from '../controllers/user';
import { createFirstStep, createSecondStep } from '../controllers/post';

const apiRouter = Router();

apiRouter.post('/authenticate', authenticate );

apiRouter.post('/registration', registration );

apiRouter.use(routesTokenProtect);

apiRouter.post('/post/create/first-step', createFirstStep);

apiRouter.post('/post/create/second-step', createSecondStep);

apiRouter.get('/users', (req, res) => {
  res.send('this is private section');
});

export default apiRouter;
