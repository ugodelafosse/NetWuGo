const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const app = express();

const User = require('./models/User');
const Post = require('./models/Post');

const auth = require('./auth');

app.use(cors());
app.use(bodyParser.json());

app.get('/posts/:id', async (req, res) => {
  const author = req.params.id;
  const posts = await Post.find({ author });
  res.send(posts);
});

app.post('/post', auth.checkAuthenticated, (req, res) => {
  const postData = req.body;
  postData.author = req.userId;

  const post = new Post(postData);

  post.save((err, result) => {
    if (err) {
      console.error('saving post error');
      return res.status(500).send({ message: 'saving post error' });
    }
    res.sendStatus(200);
  });
});

app.get('/users', async (req, res) => {
  try {
      const users = await User.find({}, '-password -__v');
      res.send(users);
  } catch (error) {
      console.error(error);
      res.sendStatus(500);
  }
});

app.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-password -__v');
    res.send(user);
  } catch (error) {
    console.error(error);
  res.sendStatus(200);
  }
});

mongoose.connect('mongodb://test:test@ds141657.mlab.com:41657/ringlowmeanapp', (err) => {
  if (!err)
    console.log('connected to mongo');
});

app.use('/auth', auth.router);

app.listen(process.env.PORT || 3000);
