const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');
const seedDB = require('./seeds');
mongoose.connect('mongodb://localhost/checklist3');
app.use(bodyParser.urlencoded({ extended: true }));
seedDB();
//SCHEMA

//Model

app.get('/', (req, res) => {
  res.render('landing.ejs');
});
//index
app.get('/campgrounds', (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    err
      ? console.log(err)
      : res.render('index.ejs', { campgrounds: allCampgrounds });
  });
});
app.post('/campgrounds', (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;
  let newCampground = { name: name, image: image, description: description };

  Campground.create(newCampground, (err, newlyCreated) => {
    err ? console.log(err) : res.redirect('/campgrounds');
  });
});
//new
app.get('/campgrounds/new', (req, res) => {
  res.render('new.ejs');
});
//show
app.get('/campgrounds/:id', (req, res) => {
  Campground.findById(req.params.id)
    .populate('comments')
    .exec((err, foundCampground) => {
      err
        ? console.log(err)
        : res.render('show.ejs', { campground: foundCampground });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('tudo de boinha');
});
