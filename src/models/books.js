import { generate } from 'shortid';

import actions from '../client/actions';
import Users from '../models/Users';

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

  constructor({ id = generate(), title, imgUrl, owner, requestedForTradeBy = '' }) {
    this.id = id;
    this.title = title;
    this.imgUrl = imgUrl;
    this.owner = owner;
    this.requestedForTradeBy = requestedForTradeBy;
  }

  save() {
    return books.set(this.id, this);
  }

  update({ owner = this.owner, requestedForTradeBy = this.requestedForTradeBy }) {
    this.owner = owner;
    this.requestedForTradeBy = requestedForTradeBy;

    return this;
  }

  delete() {
    return books.del(this.id);
  }

  trade(type, user) {
    Users.get(this.owner)
      .then((owner) => {
        this.requestedForTradeBy = user.id;
        return this.save();
      });
  }
}

export default Books;
