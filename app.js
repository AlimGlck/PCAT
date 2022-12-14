const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const ejs = require('ejs');
const methodOverride = require('method-override');

const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageController');

const app = express();

mongoose
  .connect(
    'mongodb+srv://Plottek:MhUGYRMf2JYVuDN6@cluster0.1rv0omn.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('DB CONNECTED!');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

app.set('view engine', 'ejs');

app.get('/add', pageController.getAddingPage);
app.get('/about', pageController.getAboutPage);
app.get('/photo/edit/:id', pageController.getEditPage);

app.get('/', photoController.getAllPhotos);
app.get('/photo/:id', photoController.getSinglePhoto);
app.post('/photo', photoController.photoUpload);
app.put('/photo/:id', photoController.photoUpdate);
app.delete('/photo/:id', photoController.photoDelete);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});
