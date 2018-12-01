const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');

var data = [
  {
    name: "Cloud's Rest",
    image: 'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg',
    description: 'blah blah blah'
  },
  {
    name: 'Desert Mesa',
    image: 'https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg',
    description: 'blah blah blah'
  },
  {
    name: 'Canyon Floor',
    image: 'https://farm1.staticflickr.com/189/493046463_841a18169e.jpg',
    description: 'blah blah blah'
  }
];

let seedDB = () => {
  Campground.remove({}, err => {
    console.log(err);
  });
  console.log('removed campgrounds');

  data.forEach(seed => {
    Campground.create(seed, (err, campground) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Campgrounds adicionados');
        Comment.create(
          {
            text: 'This place is great,but I wish there was internet',
            author: 'Homer'
          },
          (err, comment) => {
            if (err) {
              console.log(err);
            } else {
              campground.comments.push(comment);
              campground.save();
              console.log('created new comment');
            }
          }
        );
      }
    });
  });
};

module.exports = seedDB;
