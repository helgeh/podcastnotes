'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NoteSchema = new Schema({
  title: String,
  content: String,
  podcast_id: int,
  start_time: int,
  end_time: int
});

module.exports = mongoose.model('Note', NoteSchema);