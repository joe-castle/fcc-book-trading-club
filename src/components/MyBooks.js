import React from 'react';
import { connect } from 'react-redux'
import { RaisedButton, TextField } from 'material-ui';

import { Actions } from '../actions';

import TradeControls from './TradeControls';
import Book from './Book';

class MyBooks extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
    };
  }

  render() {
    const { books, user, dispatch } = this.props;

    return (
      <div>
        <TradeControls />
        <h1>My Books</h1>
        <form
          style={{ marginBottom: '20px' }}
          onSubmit={(ev) => {
            ev.preventDefault();

            dispatch(Actions.POST_BOOK(this.state.title))
          }}
        >
          <TextField 
            onChange={ev => this.setState({ title: ev.target.value })}
            hintText="Enter book title..."
          />
          <RaisedButton
            label="Add Book"
            type="submit"
            style={{ marginLeft: '10px' }}
            primary
          />
        </form>
        <div>
          {user.ownBooks.map((bookId) => {
            const book = books.find(book => book.id === bookId);

            return (
              <Book 
                book={book} 
                owner={book.owner === user.id}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  books: state.books,
  user: state.user,
}))(MyBooks);
