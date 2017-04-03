// import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import { signUpValidate } from '../../utils/validation';
// import { config } from '../../config';
import { UserModel } from '../../models/user';

export function signin (req, res) {
  // TODO: implement signin controller
}

export function signup (req, res) {
  const { name, email, password } = req.body;
  const values = { name, email, password };
  const validateError = signUpValidate(values);

  if (_.isEmpty(validateError)) {
    UserModel.findOne({ name: name }, (err, user) => {
      if (err) {
        res.status(500).send({
          error: err,
          message: 'Проблемы с подключением',
        });
      } else if (user) {
        res.status(200).send({
          message: 'Такой пользователь уже существует',
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
              error: err,
              message: 'Проблемы при сохранении пользователя',
            });
          }
          console.log('user saved successfully');
          res.status(200).send({
            message: 'Пользователь успешно создан',
          });
        });
      }
    });
  } else {
    res.status(300).send({
      error: validateError, // TODO: see more about http server codes
    });
  }
}
