import jwt from 'jsonwebtoken';
import { config } from '../config';

export const routesProtect = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          res.status(401).json({
            error: err,
          });
        } else {
          req.decoded = decoded,
          next();
        }
      });
    } else {
      res.status(403).json({
        error: 'Токен не найден',
      });
    }
};
