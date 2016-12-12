import React from 'react';
import { connect } from 'react-redux'
import { Card, CardActions, CardMedia, CardTitle, RaisedButton } from 'material-ui';

function AllBooks({ books }) {
  return (
    <div>
      <h1>All Books</h1>
      <div>
        {books.map(book => (
          <Card
            key={book.id}
            style={{
              display: 'inline-block',
              margin: '5px',
              width: '200px',
            }}
          >
            <CardMedia>
              <img src={book.imgUrl} alt={`${book.title} book cover`} />
            </CardMedia>
            <CardActions>
              <RaisedButton 
                label="Request Trade"
                primary={!book.requestedForTradeBy}
                disabled={book.requestedForTradeBy}
              />
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default connect(state => ({ books: state.books }))(AllBooks);
