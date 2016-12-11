import { generate } from 'shortid';

import actions from '../client/actions';

const books = actions('books');
const users = actions('users');

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

    return this.save();
  }

  delete() {
    return books.del(this.id);
  }

  trade(type, userID) {
    Promise.all([users.get(this.owner), users.get(userID)])
      .then(([owner, user]) => {
        this.requestedForTradeBy = user.id;

        return this.save();
      });
  }
}

export default Books;
