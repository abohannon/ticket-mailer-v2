import mongoose from 'mongoose';
import { REF_USER } from './schemaTypes';

const { Schema } = mongoose;

const showSchema = new Schema({
  product_id: { type: Number, unique: true },
  collection_id: { type: Number, unique: true },
  handle: String,
  updated_at: Date,
  title: String,
  variants: [{
    created_at: Date,
    updated_at: Date,
    id: Number,
    title: String,
    email_sent: { type: Boolean, default: false },
    failed_emails: { type: Number, default: 0 },
  }],
  vendor: String,
  customers: [REF_USER],
  visible: { type: Boolean, default: true },
});

const ModelClass = mongoose.model('show', showSchema);

export default ModelClass;
