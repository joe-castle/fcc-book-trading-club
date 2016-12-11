import { Router } from 'express';
import axios from 'axios';

import Books from '../models/Books';
import Users from '../models/Users';

const booksRouter = Router();

const user = new Users({
  "id": "HymBb05Qx",
  "name": "joe",
  "email": "test@test.com",
  "password": "$2a$10$6vTrHOrcQk9E5TYPltnSo.kEbN2XaLYE5IjePsxFcp/Tg2hJ/EMhq",
  "city": "",
  "state": "",
  "ownBooks": [],
  "outboundTradeRequests": [],
  "inboundTradeRequests": []
});

booksRouter.get('/api/books', (req, res) => {
  Books.get()
    .then((books) => {
      res.send(books);
    });
});

booksRouter.get('/api/books/:id', (req, res) => {
  Books.get(req.params.id)
    .then((book) => {
      if (!book) return res.status(404).send('That book doesn\'t exist');

      return res.send(book);
    });
});

booksRouter.post('/api/books/:title', (req, res) => {
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.params.title}`)
    .then(({ data }) => {
      // TODO: const { user } = req;

      if (data.items) {
        const book = new Books({
          title: data.items[0].volumeInfo.title,
          imgUrl: data.items[0].volumeInfo.imageLinks.thumbnail,
          owner: 'HymBb05Qx', // req.user.id
        });

        user.update({ ownBooks: [...user.ownBooks, book.id] });

        Promise.all([book.save(), user.save()])
          .then(() => res.status(201).send({ book, user }));
      } else {
        res.status(404).send('Book not found.');
      }
    });
});

booksRouter.put('/api/books/:id', (req, res) => {
  const { trade } = req.query;

  Books.get(req.params.id)
    .then((book) => {
      if (!book) return res.status(404).send('That book doesn\'t exist');

      if (!trade || trade !== 'request' && trade !== 'accept' && trade !== 'reject') {
        return res.status(400).send(
          'You must specify a trade query param with the value: ?trade=request|accept|reject',
        );
      }

      if (trade === 'request' && book.owner === 'owner_one' /* req.user.id */) {
        return res.status(400).send('You can\'t request a trade on a book that you already own!');
      }

      if (book.requestedForTradeBy !== '') {
        return res.send('Sorry, someone has already requested this book.');
      }


      Users.get(book.owner)
        .then((owner) => {
          if (trade === 'request') {
            user.update({ outboundTradeRequests: [...user.outboundTradeRequests, book.id] })
            book.update({ requestedForTradeBy: user.id });
            owner.update({ inboundTradeRequests: [...owner.inboundTradeRequests, book.id] });
          }

          if (trade === 'accept') {
            // update book owner
            book.update({ requestedForTradeBy: '' });
            // update owners inboundTradeRequests
            // updated user outboundTradeRequests
          }

          if (trade === 'reject') {
            book.update({ requestedForTradeBy: '' });
            // update owners inboundTradeRequests
            // updated user outboundTradeRequests
          }

          book.requestedForTradeBy = user.id;
          return this.save();
        });

      book.trade(trade, 'owner_one' /* req.user */);

      return res.send('okay!');
    });
});

booksRouter.delete('/api/books/:id', (req, res) => {
  // TODO: const { user } = req;

  Books.get(req.params.id)
    .then((book) => {
      if (!book) {
        return res.status(404).send('That book doesn\'t exist');
      }

      if (book.owner === 'HymBb05Qx' /* req.user.id */) {
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
        'title': 'Bytrex',
        img_url: 'http://placehold.it/32x32',
        'owner': 5199701651,
      },
      {
        '_id': 6191707149,
        'title': 'Moltonic',
        'img_url': 'http://placehold.it/32x32',
        'owner': 145765680,
      },
      {
        _id: 3530919250,
        title: 'Splinx',
        'img_url': 'http://placehold.it/32x32',
        owner: 3544442818,
      },
      {
        '_id': 7672207292,
        title: 'Konnect',
        img_url: 'http://placehold.it/32x32',
        owner: 7651225474,
      },
      {
        '_id': 5758618221,
        'title': 'Techtrix',
        img_url: 'http://placehold.it/32x32',
        owner: 7175253612,
      },
    ]);
    res.status(201).send('complete');
  });
}

export default booksRouter;
