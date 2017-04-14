import bcrypt from 'bcrypt';
import _ from 'lodash';
import { updateUserValidate } from '../../utils/validation';
import { UserModel } from '../../models/user';

export const updateUser = (req, res) => {
  const { name, email, password, isChange } = req.body;
  const { id } = req.params;
  const values = { name, email, password, isChange };
  const validateError = updateUserValidate(values);

  if (_.isEmpty(validateError)) {
    UserModel.findOne({ name: name }, (err, anotherUser) => {
      if (err) {
        res.status(500).json({
          error: err,
        });
      } else if (anotherUser && anotherUser.id !== id) {
        res.json({
          error: 'Имя пользователя уже занято',
        });
      } else {
        const query = { _id: id };
        UserModel.findOne(query, (err, user) => {
          const data = {
            name: name,
            email: email,
            hash: isChange ? bcrypt.hashSync(password, 10) : user.hash,
          };

          UserModel.findOneAndUpdate(query, data, { new: true }, (err, updatedUser) => {
            if (err) {
              res.status(500).json({
                error: err,
              });
            }
            res.json({
              name: updatedUser.name,
              email: updatedUser.email,
              hash: updatedUser.hash,
            });
          });
        });
      }
    });
  } else {
    res.status(403).json({
      error: validateError,
    });
  }
};
