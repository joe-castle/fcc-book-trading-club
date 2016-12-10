// import mongoose, { Schema } from 'mongoose';

// export default mongoose.model('Books', new Schema({
//   title: String,
//   img_url: String,
//   owner: String,
//   requestedForTrade: {
//     type: String,
//     default: '',
//   }
// }));

import { generate } from 'shortid'

import actions from '../client/actions';

const books = actions('books');

class Books {
  static get(id) {
    return id 
      ? books.get(id).then(book => book && new Books(book))
      : books.getAll();
  }

  static seed(data) {
    return books.mset(data);
  }

  constructor({ _id = generate(), title, img_url, owner, requestedForTrade = '' }) {
    this._id = _id;
    this.title = title;
    this.img_url = img_url;
    this.owner = owner;
    this.requestedForTrade = requestedForTrade;
  }

  save() {
    return books.set(this._id, this);
  }

  update({ owner = this.owner, requestedForTrade = this.requestedForTrade }) {
    this.owner = owner;
    this.requestedForTrade = requestedForTrade;

    return save();
  }

  delete() {
    return books.del(this._id);
  }
} 

export default Books;