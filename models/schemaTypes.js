const mongoose = require('mongoose');

exports.REF_USER = {
  type: mongoose.Schema.ObjectId,
  ref: 'user',
};