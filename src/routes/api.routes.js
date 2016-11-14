import { Router } from 'express';
import { routesTokenProtect } from '../middlewares/routesTokenProtect';
import { authenticate, registration } from '../controllers/user';


const apiRouter = Router();

apiRouter.post('/authenticate', authenticate );

apiRouter.post('/registration', registration );

apiRouter.use(routesTokenProtect);

apiRouter.get('/users', (req, res) => {
  res.send('this is private section');
});

export default apiRouter;
