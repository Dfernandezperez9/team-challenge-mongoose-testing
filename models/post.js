const MONGOOSE = require('mongoose');
const JOI = require('joi');

const POST_SCHEMA = new MONGOOSE.Schema({
  title: String,
  body: String,
});

const POST = MONGOOSE.model('Post', POST_SCHEMA);

const POST_VALIDATION_SCHEMA = JOI.object({
  title: JOI.string().required(),
  body: JOI.string().required(),
});

module.exports = { POST, POST_VALIDATION_SCHEMA };