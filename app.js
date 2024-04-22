const express = require("express");
const mongoose = require('mongoose');
const ejs =require('ejs');
const path = require("path");
const post = require('./models/newPost');
const app = express();

// connect  DB

mongoose.connect('mongodb://localhost/cleanblog-test-db');
//TEMPLATE ENGİNE
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.static('public')); // Static dosyaları koyacağımız klasörü seçtik
app.use(express.urlencoded({ extended: true })); // Body parser okuyoruz
app.use(express.json()); // Body parser dönüştürüyoruz
// ROUTES
app.get("/", async (req, res) => {
  const addPost = await post.find({})
  // dosyayo içeri çektik
  // express static middleware kullandık
  //res.sendFile(path.resolve(__dirname, "tmp/index.html"));
  res.render('index',{
    addPost
  })
 
});
app.get("/about", (req, res) => {
  res.render('about')
});
app.get("/post", (req, res) => {
  res.render('post')
});
app.get("/contact", (req, res) => {
  res.render('contact')
});
app.get("/addNewPost", (req, res) => {
  res.render('addNewPost')
});
app.post('/photos', async (req, res) => { // async - await yapısı kullanacğız.
  await post.create(req.body)// body bilgisini Photo modeli sayesinde veritabanında dökümana dönüştürüyoruz.
  res.redirect('/')
});

app.get('/', async (req, res) => {
  const addPost = await posts.find({})
  res.render('index', {
    addPost
  })});



const port = 3000;
app.listen(port, () => {
  console.log(`sunucu ${port} portunda başlatıldı`);
});