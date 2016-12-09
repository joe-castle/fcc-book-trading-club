import { Router } from 'express';
import axios from 'axios';

import Books from '../models/books';

const booksRouter = Router();

booksRouter.get('/api/books', (req, res) => {
  Books.find()
    .then(books => {
      res.send(books);
    })
});

booksRouter.get('/api/books/:id', (req, res) => {
  Books.findById(req.params.id)
    .then(book => {
      res.send(book);
    })
});

booksRouter.post('/api/books/add/:title', (req, res) => {
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.params.title}`)
    .then(({ data }) => {

      Books.findOne({ title: data.items[0].volumeInfo.title })
        .then(book => {

          if (!book) {
            book = Books({
              title: data.items[0].volumeInfo.title,
              img_url: data.items[0].volumeInfo.imageLinks.thumbnail,
              owners: ['owner_one']
            });
          } else {
            if (!book.owners.includes('owner_two')) {
              book.owners.push('owner_two')
            }
          }

          book.save().then(book => { res.send(book); });
        });
  });
});

booksRouter.delete('/api/books/delete/:id', (req, res) => {
  Books.findByIdAndRemove(req.params.id)
    .then(result => {
      res.send(result);
    })
});

booksRouter.get('/api/seed', (req, res) => {
  const starter = [
    {
      "title": "Harmoney",
      "img_url": "http://placehold.it/32x32",
      "owners": [
        {
          "_id": 8306863503,
          "name": "Elinor Vasquez"
        }
      ]
    },
    {
      "title": "Menbrain",
      "img_url": "http://placehold.it/32x32",
      "owners": [
        {
          "_id": 2413277290,
          "name": "Lily Leonard"
        }
      ]
    },
    {
      "title": "Ultrasure",
      "img_url": "http://placehold.it/32x32",
      "owners": [
        {
          "_id": 315230245,
          "name": "Ford Wagner"
        }
      ]
    },
    {
      "title": "Vortexaco",
      "img_url": "http://placehold.it/32x32",
      "owners": [
        {
          "_id": 4586431666,
          "name": "Lang Rose"
        }
      ]
    },
    {
      "title": "Artiq",
      "img_url": "http://placehold.it/32x32",
      "owners": [
        {
          "_id": 4312303972,
          "name": "Tamara Gilbert"
        }
      ]
    }
  ];

  Books.create(starter)
    .then(results => {
      res.send(results);
    })
});

export default booksRouter;