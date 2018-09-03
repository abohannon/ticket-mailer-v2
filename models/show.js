const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaTypes = require('./schemaTypes')

const showSchema = new Schema({
  product_id: Number,
  handle: String,
  updated_at: Date,
  title: String,
  variants: Array,
  vendor: String,
  customers: [schemaTypes.REF_USER],
  email_sent: { type: Boolean, default: false },
  successful_emails: { type: Number, default: 0 },
  failed_emails: { type: Number, default: 0 },
  visible: { type: Boolean, default: true },
})

const ModelClass = mongoose.model('show', showSchema);

module.exports = ModelClass;