import React from 'react';
import { connect } from 'react-redux'
import { Card, CardActions, CardMedia, CardTitle, FlatButton, RaisedButton, TextField } from 'material-ui';

import { Actions } from '../actions';

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
              <Card
                key={bookId}
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
                  <FlatButton label="Request Trade" />
                </CardActions>
              </Card>
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
