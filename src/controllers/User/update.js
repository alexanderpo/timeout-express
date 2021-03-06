import bcrypt from 'bcrypt';
import _ from 'lodash';
import { updateUserValidate } from '../../utils/validation';
import { createFile, deleteFile } from '../../utils/fileParser';
import { UserModel } from '../../models/user';

export const updateUser = (req, res) => {
  const { name, email, image, password, isChange } = req.body;
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
          error: 'Username already taken',
        });
      } else {
        const query = { _id: id };
        UserModel.findOne(query, (err, user) => {
          const imagePath = `public/images/users/${user._id}`;
          const regexContentType = /^data:image\/\w+;base64,/;
          const contentType = !image ? '' : regexContentType.exec(image)[0];
          const imageData = !image ? '' : image.replace(regexContentType, '');

          deleteFile(imagePath);
          createFile(imagePath, imageData, 'base64');

          const data = {
            name: name,
            email: email,
            image: {
              path: `public/images/users/${user._id}`,
              contentType: contentType,
            },
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
              image: contentType + imageData,
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
