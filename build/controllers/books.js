'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _middleware = require('../middleware');

var _Books = require('../models/Books');

var _Books2 = _interopRequireDefault(_Books);

var _Users = require('../models/Users');

var _Users2 = _interopRequireDefault(_Users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var booksRouter = (0, _express.Router)();

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

// TODO: Unecassary?
booksRouter.get('/api/books', _middleware.ensureAuthenticated, function (req, res) {
  _Books2.default.get().then(function (books) {
    return res.send(books);
  });
});

booksRouter.get('/api/books/:id', _middleware.ensureAuthenticated, function (req, res) {
  _Books2.default.get(req.params.id).then(function (book) {
    if (!book) return res.status(404).send('That book doesn\'t exist');

    return res.send(book);
  });
});

booksRouter.post('/api/books/:title', _middleware.ensureAuthenticated, function (req, res) {
  _axios2.default.get('https://www.googleapis.com/books/v1/volumes?q=' + req.params.title).then(function (_ref) {
    var data = _ref.data;
    var user = req.user;


    if (data.items) {
      (function () {
        var book = new _Books2.default({
          title: data.items[0].volumeInfo.title,
          imgUrl: data.items[0].volumeInfo.imageLinks.thumbnail,
          owner: user.id
        });

        user.update({ ownBooks: [].concat(_toConsumableArray(user.ownBooks), [book.id]) });

        Promise.all([book.save(), user.save()]).then(function () {
          return res.status(201).send(book);
        });
      })();
    } else {
      res.status(404).send('Book not found.');
    }
  });
});

booksRouter.put('/api/books/:id', _middleware.ensureAuthenticated, function (req, res) {
  _Books2.default.get(req.params.id).then(function (book) {
    var user = req.user;
    var trade = req.query.trade;


    if (!book) return res.status(404).send('That book doesn\'t exist');

    if (!trade || trade !== 'request' && trade !== 'accept' && trade !== 'reject' && trade !== 'cancel') {
      return res.status(400).send('You must specify a trade query param with the value: ?trade=request|accept|reject|cancel');
    }

    // Request and cancel context, user is the person requesting the book.
    if (trade === 'request' || trade === 'cancel') {
      _Users2.default.get(book.owner).then(function (owner) {
        if (trade === 'request') {
          if (book.owner === user.id) {
            return res.status(400).send('You can\'t request a trade on a book that you already own!');
          }

          if (book.requestedForTradeBy !== '') {
            return res.status(400).send('Sorry, someone has already requested this book.');
          }

          book.update({ requestedForTradeBy: user.id });
          user.update({ outboundTradeRequests: [].concat(_toConsumableArray(user.outboundTradeRequests), [book.id]) });
          owner.update({ inboundTradeRequests: [].concat(_toConsumableArray(owner.inboundTradeRequests), [book.id]) });

          Promise.all([user.save(), book.save(), owner.save()]).then(function () {
            return res.send('Trade request accpeted.');
          });
        }

        if (trade === 'cancel') {
          if (book.requestedForTradeBy !== user.id) {
            return res.status(400).send('You can\'t cancel a trade on a book you haven\'t requested.');
          }

          book.update({ requestedForTradeBy: '' });
          user.update({
            outboundTradeRequests: user.outboundTradeRequests.filter(function (request) {
              return request !== book.id;
            })
          });
          owner.update({
            inboundTradeRequests: owner.inboundTradeRequests.filter(function (request) {
              return request !== book.id;
            })
          });

          Promise.all([user.save(), book.save(), owner.save()]).then(function () {
            return res.send('Trade request cancelled.');
          });
        }
      });
    }

    // Accept and reject context, user is the person has been reqested of.
    if (trade === 'accept' || trade === 'reject') {
      if (book.owner !== user.id) {
        return res.status(400).send('You can\'t accept or reject a trade on a book you don\'t own.');
      }

      if (book.requestedForTradeBy === '') {
        return res.status(400).send('That book hasn\'t been requested for trade.');
      }

      _Users2.default.get(book.requestedForTradeBy).then(function (requestee) {
        if (trade === 'accept') {
          book.update({ owner: requestee.id, requestedForTradeBy: '' });
          user.update({
            ownBooks: user.ownBooks.filter(function (ownBook) {
              return ownBook !== book.id;
            }),
            inboundTradeRequests: user.inboundTradeRequests.filter(function (request) {
              return request !== book.id;
            })
          });
          requestee.update({
            ownBooks: [].concat(_toConsumableArray(requestee.ownBooks), [book.id]),
            outboundTradeRequests: requestee.outboundTradeRequests.filter(function (request) {
              return request !== book.id;
            })
          });

          Promise.all([book.save(), user.save(), requestee.save()]).then(function () {
            return res.send('Trade accepted.');
          });
        }

        if (trade === 'reject') {
          book.update({ requestedForTradeBy: '' });
          user.update({
            inboundTradeRequests: user.inboundTradeRequests.filter(function (request) {
              return request !== book.id;
            })
          });
          requestee.update({
            outboundTradeRequests: requestee.outboundTradeRequests.filter(function (request) {
              return request !== book.id;
            })
          });

          Promise.all([book.save(), user.save(), requestee.save()]).then(function () {
            return res.send({ book: book, user: user, requestee: requestee });
          });
        }
      });
    }
  });
});

booksRouter.delete('/api/books/:id', _middleware.ensureAuthenticated, function (req, res) {
  _Books2.default.get(req.params.id).then(function (book) {
    var user = req.user;


    if (!book) {
      return res.status(404).send('That book doesn\'t exist');
    }

    if (book.owner === user.id) {
      user.update({ ownBooks: user.ownBooks.filter(function (ownBook) {
          return ownBook !== book.id;
        }) });

      Promise.all([book.delete(), user.save()]).then(function () {
        return res.send('Deleted ' + book.title);
      });
    } else {
      return res.status(401).send('You\'re not authorised to delete this book');
    }
  });
});

if (process.env.NODE_ENV === 'development') {
  booksRouter.get('/api/books/seed', function (req, res) {
    _Books2.default.seed([{
      _id: 3550186490,
      title: 'Bytrex',
      img_url: 'http://placehold.it/32x32',
      owner: 5199701651
    }, {
      _id: 6191707149,
      title: 'Moltonic',
      img_url: 'http://placehold.it/32x32',
      owner: 145765680
    }, {
      _id: 3530919250,
      title: 'Splinx',
      img_url: 'http://placehold.it/32x32',
      owner: 3544442818
    }, {
      _id: 7672207292,
      title: 'Konnect',
      img_url: 'http://placehold.it/32x32',
      owner: 7651225474
    }, {
      _id: 5758618221,
      title: 'Techtrix',
      img_url: 'http://placehold.it/32x32',
      owner: 7175253612
    }]);
    res.status(201).send('complete');
  });
}

exports.default = booksRouter;