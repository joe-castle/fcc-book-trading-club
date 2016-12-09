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
    return books.get(id);
  }

  static getAll() {
    return books.getAll();
  }

  static delete(id) {
    return books.del(id);
  }

  static seed(data) {
    return books.mset(data);
  }

  constructor({ title, img_url, owner, requestedForTrade = '' }) {
    this._id = generate();
    this.title = title;
    this.img_url = img_url;
    this.owner = owner;
    this.requestedForTrade = requestedForTrade;
  }

  save() {
    return books.set(this._id, this);
  }
} 

export default Books;