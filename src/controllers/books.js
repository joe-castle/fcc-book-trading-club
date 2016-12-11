import { Router } from 'express';
import axios from 'axios';

import Books from '../models/Books';
import Users from '../models/Users';

const booksRouter = Router();

// const user = new Users({
//   id: 'rkYaTyo7l',
//   name: 'joe',
//   email: 'test@test.com',
//   password: '$2a$10$E0/u2Kded2tizBmRwPQVE.fsTn0E/XznK1P0HF5jNcpSWa.n/Tmrm',
//   city: 'london',
//   state: 'essex',
//   ownBooks: ['rkkiyxjXx'],
//   outboundTradeRequests: [],
//   inboundTradeRequests: [],
// });

// const user = new Users({
//   'id': 'BkIVOyimg',
//   name: 'hayley',
//   email: 'test2@test.com',
//   password: '$2a$10$7l9QWCAqCTW3eRkB9E6rZ.0cYouYtYUXCS.zGa8oP.QHA11sFbM/C',
//   'city': '',
//   state: '',
//   'ownBooks': [
//     'Bk-Sd1sQx',
//     'HJn5jJjXl',
//   ],
//   'outboundTradeRequests': [],
//   'inboundTradeRequests': [
//     'Bk-Sd1sQx',
//   ],
// });

booksRouter.get('/api/books', (req, res) => {
  Books
    .get()
    .then(books => res.send(books));
});

booksRouter.get('/api/books/:id', (req, res) => {
  Books
    .get(req.params.id)
    .then((book) => {
      if (!book) return res.status(404).send('That book doesn\'t exist');

      return res.send(book);
    });
});

booksRouter.post('/api/books/:title', (req, res) => {
  axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=${req.params.title}`)
    .then(({ data }) => {
      // TODO: const { user } = req;

      if (data.items) {
        const book = new Books({
          title: data.items[0].volumeInfo.title,
          imgUrl: data.items[0].volumeInfo.imageLinks.thumbnail,
          owner: user.id,
        });

        user.update({ ownBooks: [...user.ownBooks, book.id] });

        Promise.all([book.save(), user.save()])
          .then(() => res.status(201).send(book));
      } else {
        res.status(404).send('Book not found.');
      }
    });
});

booksRouter.put('/api/books/:id', (req, res) => {
  const { trade } = req.query;

  Books
    .get(req.params.id)
    .then((book) => {
      if (!book) return res.status(404).send('That book doesn\'t exist');

      if (
        !trade 
        || trade !== 'request'
        && trade !== 'accept'
        && trade !== 'reject'
        && trade !== 'cancel'
      ) {
        return res.status(400).send(
          'You must specify a trade query param with the value: ?trade=request|accept|reject|cancel',
        );
      }

      // Request context, user is the person requesting the book.
      if (trade === 'request') {
        if (book.owner === user.id) {
          return res.status(400).send('You can\'t request a trade on a book that you already own!');
        }

        if (book.requestedForTradeBy !== '') {
          return res.send('Sorry, someone has already requested this book.');
        }

        Users
          .get(book.owner)
          .then((owner) => {
            user.update({ outboundTradeRequests: [...user.outboundTradeRequests, book.id] });
            book.update({ requestedForTradeBy: user.id });
            owner.update({ inboundTradeRequests: [...owner.inboundTradeRequests, book.id] });

            Promise.all([user.save(), book.save(), owner.save()])
              .then(() => res.send('Trade request accpeted'));
          });
      }

      // Accept and reject context, user is the person has been reqested of.
      if (trade === 'accept' || trade === 'reject') {
        if (book.owner !== user.id) {
          return res.send('You can\'t accept or reject a trade on a book you don\'t own');
        }

        if (book.requestedForTradeBy === '') {
          return res.send('That book hasn\'t been requested for trade');
        }

        Users
          .get(book.requestedForTradeBy)
          .then((requestee) => {
            if (trade === 'accept') {
              book.update({ owner: requestee.id, requestedForTradeBy: '' });
              user.update({
                ownBooks: user.ownBooks.filter(ownBook => ownBook !== book.id),
                inboundTradeRequests: user.inboundTradeRequests.filter(
                  request => request !== book.id,
                ),
              });
              requestee.update({
                ownBooks: [...requestee.ownBooks, book.id],
                outboundTradeRequests: user.outboundTradeRequests.filter(
                  request => request !== book.id,
                ),
              });

              Promise.all([book.save(), user.save(), requestee.save()])
                .then(() => res.send('Trade accepted.'));
            }

            if (trade === 'reject') {
              book.update({ requestedForTradeBy: '' });
              user.update({
                inboundTradeRequests: user.inboundTradeRequests.filter(
                  request => request !== book.id,
                ),
              });
              requestee.update({
                outboundTradeRequests: user.outboundTradeRequests.filter(
                  request => request !== book.id,
                ),
              });

              Promise.all([book.save(), user.save(), requestee.save()])
                .then(() => res.send({ book, user, requestee }));
            }
          });
      }

      // Trade request cancel
    });
});

booksRouter.delete('/api/books/:id', (req, res) => {
  // TODO: const { user } = req;

  Books
    .get(req.params.id)
    .then((book) => {
      if (!book) {
        return res.status(404).send('That book doesn\'t exist');
      }

      if (book.owner === user.id) {
        user.update({ ownBooks: user.ownBooks.filter(ownBook => ownBook !== book.id) });

        Promise.all([book.delete(), user.save()])
          .then(() => res.send(`Deleted ${book.title}`));
      } else {
        return res.status(401).send('You\'re not authorised to delete this book');
      }
    });
});

if (process.env.NODE_ENV === 'development') {
  booksRouter.get('/api/seed', (req, res) => {
    Books.seed([
      {
        _id: 3550186490,
        title: 'Bytrex',
        img_url: 'http://placehold.it/32x32',
        owner: 5199701651,
      },
      {
        _id: 6191707149,
        title: 'Moltonic',
        img_url: 'http://placehold.it/32x32',
        owner: 145765680,
      },
      {
        _id: 3530919250,
        title: 'Splinx',
        img_url: 'http://placehold.it/32x32',
        owner: 3544442818,
      },
      {
        _id: 7672207292,
        title: 'Konnect',
        img_url: 'http://placehold.it/32x32',
        owner: 7651225474,
      },
      {
        _id: 5758618221,
        title: 'Techtrix',
        img_url: 'http://placehold.it/32x32',
        owner: 7175253612,
      },
    ]);
    res.status(201).send('complete');
  });
}

export default booksRouter;
