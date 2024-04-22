const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');

const Post = require('./models/Post')

const path = require('path');

const app = express();

// Databse connection
mongoose
  .connect('mongodb://localhost/cleanblog-test-db')
  .then(() => console.log('database bağlantısı kuruldu'));

//VİEW ENGİNE SETUP
app.set('view engine', 'ejs');

//MİDDLEWARE
app.use(express.static(path.resolve(__dirname + '/public')));
app.use(express.urlencoded({extended: true}))
app.use(express.json());

//ROUTES
app.get('/', async (req, res) => {
  const posts = await Post.find({})
    res.render('index', {posts});
});

app.get('/post/:post_id', async (req,res) =>{
  const foundedPost = await Post.findById(req.params.post_id)
  res.render('post', {post: foundedPost})
})

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add_post', (req, res) => {
  res.render('add_post');
});


app.get('/post', (req, res) => {
  res.render('post');
});

app.post('/add_post', async (req, res) => {
  await Post.create(req.body)

  res.redirect('/')
});

const port = 3000;
app.listen(port, () => {
  console.log(`sunucu ${port} ile çalışıyor`);
});
