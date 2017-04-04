import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import { signInValidate, signUpValidate } from '../../utils/validation';
import { config } from '../../config';
import { UserModel } from '../../models/user';

export function signin (req, res) {
  const { name, password } = req.body;
  const values = { name, password };
  const validateError = signInValidate(values);

  if (_.isEmpty(validateError)) {
    UserModel.findOne({ name: name }, (err, user) => {
      if (err) {
        res.status(500).json({
          error: err,
        });
      } else if (!user) {
        res.json({
          error: 'Данного пользователя не существует',
        });
      } else if (user) {
        bcrypt.compare(password, user.hash, (err, isCompare) => {
          if (isCompare) {
            const token = jwt.sign(user, config.secret);
            res.json({
              id: user._id,
              name: user.name,
              email: user.email,
              hash: user.hash,
              liked_posts: user.liked_posts,
              token: token,
            });
          } else {
            res.json({
              error: 'Вы ввели неправельный пароль',
            });
          }
        });
      }
    });
  } else {
    res.status(403).json({
      error: validateError,
    });
  }
}

export function signup (req, res) {
  const { name, email, password } = req.body;
  const values = { name, email, password };
  const validateError = signUpValidate(values);

  if (_.isEmpty(validateError)) {
    UserModel.findOne({ name: name }, (err, user) => {
      if (err) {
        res.status(500).json({
          error: err,
        });
      } else if (user) {
        res.json({
          error: 'Такой пользователь уже существует',
        });
      } else if (!user) {
        const hash = bcrypt.hashSync(password, 10);

        const user = new UserModel({
          name: name,
          email: email,
          hash: hash,
          liked_posts: [],
          image: '', // TODO: implement default image
        });

        user.save((error) => {
          if (error) {
            res.json({
              error: error,
            });
          }
          res.status(200);
        });
      }
    });
  } else {
    res.status(403).json({
      error: validateError,
    });
  }
}
