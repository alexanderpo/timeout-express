import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from '../config';
import { userSchema } from '../models/user';

export function authenticate (req, res) {
  userSchema.findOne({
    name: req.body.name
  }, (err, user) => {

    if (err) throw err;

    if (!user) {
      res.json({
        success: false,
        message: 'User not found.',
      });
    } else if (user) {
      bcrypt.compare(req.body.password, user.hash, (err, isCompare) => {
        if (isCompare) {
          const token = jwt.sign(user, config.secret, {
            expiresIn: '1440m' // expires in 24 hours
          });
          res.json({
            success: true,
            name: user.name,
            email: user.email,
            token: token,
          });
        } else {
          res.json({
            success: false,
            message: 'Wrong password.',
          });
        }
      });
    }
  });
}

export function registration (req, res) {
  userSchema.findOne({ name: req.body.name }, (err, user) => {
    if (err) throw err;

    if (user) {
      res.json({
        success: false,
        message: 'Username already used!'
      });
    } else {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const user = new userSchema({
        name: req.body.name,
        email: req.body.email,
        hash: hash,
      });

      user.save((err) => {
        if (err) throw err;
        console.log('User saved successfully');
        res.json({
          success: true,
        });
      });
    }
  });
}
