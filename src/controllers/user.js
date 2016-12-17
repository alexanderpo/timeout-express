import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import fs from 'fs';
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

          const img_url = fs.readFileSync(user.image.img_url);
          const img_type = user.image.img_type;
          const image = new Buffer(img_url).toString('base64');

          res.json({
            success: true,
            id: user._id,
            name: user.name,
            email: user.email,
            image: 'data:' + img_type + ';base64,' + image,
            img_type: img_type,
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
        message: 'Username already used!',
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

export function updateInformation (req, res) {
  const { oldName, name, email, dataImage, oldImageType, imageType } = req.body;
  const id = req.params.id;
  const imageFormat = imageType.split('/')[1];
  const oldImageFormat = oldImageType.split('/')[1];
  const oldImagePath = 'public/users/images/' + oldName  + '.' + oldImageFormat;
  const newImagePath = 'public/users/images/' + name  + '.' + imageFormat;

  userSchema.findOne({ name: name }, (err, user) => {
    if (err) throw err;

    if (user && user.id !== id) {
      res.json({
        success: false,
        message: 'Username already used!',
      });
    } else {
      const newData = {
        image: {
          img_url: newImagePath,
          img_type: imageType,
        },
        name: name,
        email: email,
      };
      userSchema.findOneAndUpdate({ _id: id }, newData, (err, updatedUser) => {
        if (err) throw err;
        if (updatedUser && dataImage !== null) {
          const data = dataImage.replace(/^data:image\/\w+;base64,/, '');

          fs.unlink(oldImagePath, (err) => {
            if (err) { console.log(err); }
          });

          fs.writeFile(newImagePath, data, { encoding: 'base64' }, (err) => {
            if (err) throw err;
            console.log('Image saved successfully!');
          });
        }
        res.json({
          success: true,
          message: 'Profile updated',
          data: {
            name: newData.name,
            email: newData.email,
            image: {
              data: dataImage,
              type: imageType,
            },
          },
        });
      });
    }
  });
}
