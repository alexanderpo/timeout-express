import jwt from 'jsonwebtoken';
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
      if (user.password !== req.body.password) {
        res.json({
          success: false,
          message: 'Wrong password.',
        });
      } else {
        const token = jwt.sign(user, config.secret, {
          expiresIn: '1440m' // expires in 24 hours
        });
        res.json({
          success: true,
          name: user.name,
          email: user.email,
          token: token,
        });
      }
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
      const user = new userSchema({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
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
