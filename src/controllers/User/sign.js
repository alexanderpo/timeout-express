import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import fs from 'fs';
import _ from 'lodash';
import { signInValidate, signUpValidate } from '../../utils/validation';
import { config } from '../../config';
import { UserModel } from '../../models/user';

export const signin = (req, res) => {
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
            const imageFile = (file) => {
              try {
                const dataFile = fs.readFileSync(file);
                return dataFile;
              } catch (err) {
                if (err.code === 'ENOENT') {
                  console.log('user without avatar is signing......');
                  return '';
                } else {
                  throw err;
                }
              }
            };
            const imageData = new Buffer(imageFile(user.image.path)).toString('base64');
            const image = user.image.contentType + imageData; // 'data:' + img_type + ';base64,' + image

            const token = jwt.sign(user, config.secret);
            res.json({
              id: user._id,
              name: user.name,
              email: user.email,
              hash: user.hash,
              image: image,
              created_at: user.created_at,
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
};

export const signup = (req, res) => {
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
          error: 'Имя пользователя уже занято',
        });
      } else if (!user) {
        const hash = bcrypt.hashSync(password, 10);

        const user = new UserModel({
          name: name,
          email: email,
          hash: hash,
          liked_posts: [],
          image: {
            path: '',
            contentType: '',
          },
        });

        user.save((error) => {
          if (error) {
            res.json({
              error: error,
            });
          }
          res.status(200).json({});
        });
      }
    });
  } else {
    res.status(403).json({
      error: validateError,
    });
  }
};
