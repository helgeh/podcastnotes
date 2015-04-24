'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PodcastSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  url: String
});

module.exports = mongoose.model('Podcast', PodcastSchema);