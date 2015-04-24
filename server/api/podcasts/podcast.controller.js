/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /podcasts              ->  index
 * POST    /podcasts              ->  create
 * GET     /podcasts/:id          ->  show
 * PUT     /podcasts/:id          ->  update
 * DELETE  /podcasts/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Podcast = require('./podcast.model');

// Get list of podcasts
exports.index = function(req, res) {
  Podcast.find(function (err, podcasts) {
    if(err) { return handleError(res, err); }
    return res.json(200, podcasts);
  });
};

// Get a single podcast
exports.show = function(req, res) {
  Podcast.findById(req.params.id, function (err, podcast) {
    if(err) { return handleError(res, err); }
    if(!podcast) { return res.send(404); }
    return res.json(podcast);
  });
};

// Creates a new podcast in the DB.
exports.create = function(req, res) {
  Podcast.create(req.body, function(err, podcast) {
    if(err) { return handleError(res, err); }
    return res.json(201, podcast);
  });
};

// Updates an existing podcast in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Podcast.findById(req.params.id, function (err, podcast) {
    if (err) { return handleError(res, err); }
    if(!podcast) { return res.send(404); }
    var updated = _.merge(podcast, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, podcast);
    });
  });
};

// Deletes a podcast from the DB.
exports.destroy = function(req, res) {
  Podcast.findById(req.params.id, function (err, podcast) {
    if(err) { return handleError(res, err); }
    if(!podcast) { return res.send(404); }
    podcast.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}