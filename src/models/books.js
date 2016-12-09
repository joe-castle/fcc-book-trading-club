import mongoose, { Schema } from 'mongoose';

const booksSchema = new Schema({
  title: String,
  img_url: String,
  owners: Array,
});

export default mongoose.model('Books', booksSchema);