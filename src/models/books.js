import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Books', new Schema({
  title: String,
  img_url: String,
  owner: String,
  requestedForTrade: {
    type: String,
    default: '',
  }
}));