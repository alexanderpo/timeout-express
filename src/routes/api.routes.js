import { Router } from 'express';

const apiRouter = Router();

apiRouter.get('/', (req, res) => {
  res.send('hello its  a root route');
});

export default apiRouter;
