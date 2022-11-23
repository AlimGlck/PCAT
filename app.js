const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');

const path = require('path');

const Photo = require('./models/Photo');

const app = express();

mongoose.connect('mongodb://localhost/pcat-test-db');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  const photos = await Photo.find({});
  res.render('index', {
    photos,
  });
  
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/photos/:id', async (req,res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo',{
    photo,
  });
});

app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});
