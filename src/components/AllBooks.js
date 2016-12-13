import React from 'react';
import { connect } from 'react-redux';

import { Actions } from '../actions';

import TradeControls from './TradeControls';
import Book from './Book';

function AllBooks({ books, user, dispatch }) {
  return (
    <div>
      <TradeControls />
      <h1>All Books</h1>
      <div>
        {books.map(book => (
          <Book 
            book={book} 
            owner={book.owner === user.id}
            request={() => dispatch(Actions.PUT_TRADE_REQUEST(book.id))} 
          />
        ))}
      </div>
    </div>
  );
}

export default connect(state => ({
  books: state.books,
  user: state.user,
}))(AllBooks);
