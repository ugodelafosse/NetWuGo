const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');

const express = require('express');
const router = express.Router();

const User = require('./models/User');

router.post('/register', (req, res) => {
  const userData = req.body;

  const user = new User(userData);

  user.save((err, newUser) => {
    if (err)
      return res.status(500).send({ message: 'Error saving user' });

    createSendToken(res, newUser);
  });
});

router.post('/login', async (req, res) => {
  const loginData = req.body;

  const user = await User.findOne({ email: loginData.email });

  if (!user)
    return res.status(401).send({ message: 'Email or password invalid' });

  bcrypt.compare(loginData.password, user.password, (err, isMatch) => {
    if (!isMatch)
      return res.status(401).send({ message: 'Email or password invalid' });

    TokenAndUserInfos(res, user);

  });
});

function TokenAndUserInfos(res, user) {

  const payload = { sub: user._id };

  const token = jwt.encode(payload, '123');

  const username = user.firstname;

  res.status(200).send({ token, username });
}

const auth = {
  router,
  checkAuthenticated: (req, res, next) => {
      if (!req.header('Authorization'))
        return res.status(401).send({ message: 'Unauthorized. Missing Auth Header' })

      const token = req.header('Authorization').split(' ')[1];

      const payload = jwt.decode(token, '123');

      if (!payload)
        return res.status(401).send({ message: 'Unauthorized. Auth Header Invalid' })

      req.userId = payload.sub;

      next();
  }
}

module.exports = auth;
