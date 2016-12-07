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

export function updateInformation (req, res) {
  const { name, email, dataImage } = req.body;
  const id = req.params.id;
  const imageType = '.png';
  const saveImagePath = 'public/users/images/' + name  + imageType;

  const newData = {
    avatar: saveImagePath,
    name: name,
    email: email,
  };

  userSchema.findOneAndUpdate({ _id: id }, newData, (err, user) => {
    if (err) throw err;
    if (user) {
      if (dataImage !== null) {
        const data = dataImage.replace(/^data:image\/\w+;base64,/, '');

        fs.writeFile(saveImagePath, data, { encoding: 'base64' }, (err) => {
          if (err) throw err;
          console.log('Image saved successfully!');
        });
      }
    }
    res.json({
      success: true,
      message: 'Profile updated',
      name: name,
      email: email,
    });
  });
}
