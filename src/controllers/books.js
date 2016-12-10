import { Router } from 'express';
import axios from 'axios';

import Books from '../models/Books';
import Users from '../models/Users';

const booksRouter = Router();

booksRouter.get('/api/books', (req, res) => {
  Books.get()
    .then(books => {
      res.send(books);
    })
});

booksRouter.get('/api/books/:id', (req, res) => {
  Books.get(req.params.id)
    .then(book => {
      if (!book) {
        res.status(404).send('That book doesn\'t exist');
      }

      res.send(book);
    })
});

booksRouter.post('/api/books/:title', (req, res) => {
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.params.title}`)
    .then(({ data }) => {
      if (data.items) {
        const book = new Books({
          title: data.items[0].volumeInfo.title,
          img_url: data.items[0].volumeInfo.imageLinks.thumbnail,
          owner: 'owner_one' // req.user._id
        })
        
        book.save()
          .then(() => {
            res.status(201).send(book);
          });
      } else {
        res.status(404).send('Book not found.');
      }
    })
});

booksRouter.put('/api/books/:id', (req, res) => {
  Books.get(bookID)
    .then(book => {
      if (!book) {
        return res.status(404).send('That book doesn\'t exist');
      }

      if (book.owner === 'owner_one' /* req.user._id */) {
        return res.send('You can\'t request a trade on a book that you already own!');
      }


      // Users.findById('owner_one', /* req.user._id */)
      //   .then(user => {
      //     user.update({  })
      //   })

      //   Users.find()

      // book.update({ requestForTrade: 'owner_one' /* req.user._id */ });

    });
});

booksRouter.delete('/api/books/:id', (req, res) => {
  Books.get(req.params.id)
    .then(book => {
      if (!book) {
        return res.status(404).send('That book doesn\'t exist');
      }
      
      if (book.owner === 'owner_one' /* req.user._id */) {
        book.delete()
          .then(result => {
            res.send(`Deleted ${book.title}`);
          })
      } else {
        res.status(401).send('You\'re not authorised to delete this book');
      }
    });
});

if (process.env.NODE_ENV === 'development') {
  booksRouter.get('/api/seed', (req, res) => {
    Books.seed([
      {
        "_id": 3550186490,
        "title": "Bytrex",
        "img_url": "http://placehold.it/32x32",
        "owner": 5199701651
      },
      {
        "_id": 6191707149,
        "title": "Moltonic",
        "img_url": "http://placehold.it/32x32",
        "owner": 145765680
      },
      {
        "_id": 3530919250,
        "title": "Splinx",
        "img_url": "http://placehold.it/32x32",
        "owner": 3544442818
      },
      {
        "_id": 7672207292,
        "title": "Konnect",
        "img_url": "http://placehold.it/32x32",
        "owner": 7651225474
      },
      {
        "_id": 5758618221,
        "title": "Techtrix",
        "img_url": "http://placehold.it/32x32",
        "owner": 7175253612
      }
    ])
    res.status(201).send('complete')
  });
}

export default booksRouter;