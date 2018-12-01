const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/checklist3');
app.use(bodyParser.urlencoded({ extended: true }));
//SCHEMA
campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});
//Model
const Campground = mongoose.model('Campground', campgroundSchema);
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
  Campground.findById(req.params.id, (err, foundCampground) => {
    err
      ? console.log(err)
      : res.render('show.ejs', { campground: foundCampground });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('tudo de boinha');
});
