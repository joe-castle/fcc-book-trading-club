import { Router } from 'express';
import axios from 'axios';

import { ensureAuthenticated } from '../middleware';

import Books from '../models/Books';
import Users from '../models/Users';

const booksRouter = Router();

// const user = new Users({
//   id: 'BJjZ8rs7e',
//   name: 'joe',
//   email: 'test@test.com',
//   password: '$2a$10$.Bte8pN/WlLwj0KZvOpJOeq/t80cAdMSLOhOv39FaMMndHnwlBKF.',
//   city: '',
//   state: '',
//   ownBooks: [],
//   outboundTradeRequests: ['rJpX8SsQl'],
//   inboundTradeRequests: [],
// });

// const user2 = new Users({
//   id: 'ry_zUHsmx',
//   name: 'hayley',
//   email: 'test2@test.com',
//   password: '$2a$10$up1XjhpkIVH.lFO1QsyPs.jVUPgOLhhXPaKoI.gRyyF1DXDiH7KDW',
//   city: '',
//   state: '',
//   ownBooks: [
//     'rJpX8SsQl',
//   ],
//   outboundTradeRequests: [],
//   inboundTradeRequests: ['rJpX8SsQl'],
// });

booksRouter.get('/api/books', ensureAuthenticated, (req, res) => {
  Books
    .get()
    .then(books => res.send(books));
});

booksRouter.get('/api/books/:id', ensureAuthenticated, (req, res) => {
  Books
    .get(req.params.id)
    .then((book) => {
      if (!book) return res.status(404).send('That book doesn\'t exist');

      return res.send(book);
    });
});

booksRouter.post('/api/books/:title', ensureAuthenticated, (req, res) => {
  axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=${req.params.title}`)
    .then(({ data }) => {
      const { user } = req;

      if (data.items) {
        const book = new Books({
          title: data.items[0].volumeInfo.title,
          imgUrl: data.items[0].volumeInfo.imageLinks.thumbnail,
          owner: user.id,
        });

        user.update({ ownBooks: [...user.ownBooks, book.id] });

        Promise
          .all([book.save(), user.save()])
          .then(() => res.status(201).send(book));
      } else {
        res.status(404).send('Book not found.');
      }
    });
});

booksRouter.put('/api/books/:id', ensureAuthenticated, (req, res) => {
  Books
    .get(req.params.id)
    .then((book) => {
      const { user } = req;
      const { trade } = req.query;

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

      // Request and cancel context, user is the person requesting the book.
      if (trade === 'request' || trade === 'cancel') {
        Users
          .get(book.owner)
          .then((owner) => {
            if (trade === 'request') {
              if (book.owner === user.id) {
                return res
                  .status(400)
                  .send('You can\'t request a trade on a book that you already own!');
              }

              if (book.requestedForTradeBy !== '') {
                return res.status(400).send('Sorry, someone has already requested this book.');
              }

              book.update({ requestedForTradeBy: user.id });
              user.update({ outboundTradeRequests: [...user.outboundTradeRequests, book.id] });
              owner.update({ inboundTradeRequests: [...owner.inboundTradeRequests, book.id] });

              Promise
                .all([user.save(), book.save(), owner.save()])
                .then(() => res.send('Trade request accpeted.'));
            }

            if (trade === 'cancel') {
              if (book.requestedForTradeBy !== user.id) {
                return res
                  .status(400)
                  .send('You can\'t cancel a trade on a book you haven\'t requested.');
              }

              book.update({ requestedForTradeBy: '' });
              user.update({
                outboundTradeRequests: user.outboundTradeRequests.filter(
                  request => request !== book.id,
                ),
              });
              owner.update({
                inboundTradeRequests: owner.inboundTradeRequests.filter(
                  request => request !== book.id,
                ),
              });

              Promise
                .all([user.save(), book.save(), owner.save()])
                .then(() => res.send('Trade request cancelled.'));
            }
          });
      }

      // Accept and reject context, user is the person has been reqested of.
      if (trade === 'accept' || trade === 'reject') {
        if (book.owner !== user.id) {
          return res.send('You can\'t accept or reject a trade on a book you don\'t own.');
        }

        if (book.requestedForTradeBy === '') {
          return res.send('That book hasn\'t been requested for trade.');
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
                outboundTradeRequests: requestee.outboundTradeRequests.filter(
                  request => request !== book.id,
                ),
              });

              Promise
                .all([book.save(), user.save(), requestee.save()])
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
                outboundTradeRequests: requestee.outboundTradeRequests.filter(
                  request => request !== book.id,
                ),
              });

              Promise
                .all([book.save(), user.save(), requestee.save()])
                .then(() => res.send({ book, user, requestee }));
            }
          });
      }
    });
});

booksRouter.delete('/api/books/:id', ensureAuthenticated, (req, res) => {
  Books
    .get(req.params.id)
    .then((book) => {
      const { user } = req;

      if (!book) {
        return res.status(404).send('That book doesn\'t exist');
      }

      if (book.owner === user.id) {
        user.update({ ownBooks: user.ownBooks.filter(ownBook => ownBook !== book.id) });

        Promise
          .all([book.delete(), user.save()])
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
