import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { Actions, POST_BOOK, DELETE_BOOK } from '../actions';

export class App extends React.Component {
  render() {
    const { dispatch } = this.props;

    return (
      <div className="App">
        <main>
          <h1>Book Trading Club</h1>
          <form
            onSubmit={(ev) => {
              // Without preventDefault, user doesn't login properly
              ev.preventDefault();
              
              axios.post('/login', { email: this.email.value, password: this.password.value })
                .then(console.log)
            }}
          >
            <input ref={(c) => { this.email = c; }} type="email" />
            <input ref={(c) => { this.password = c; }} type="password" />
            <input type="submit" />
          </form>
          <input ref={(c) => { this.title = c; }} />
          <button onClick={() => dispatch(POST_BOOK(this.title.value))}>Add book</button>

          <input ref={(c) => { this.id = c; }} />
          <button onClick={() => dispatch(DELETE_BOOK(this.id.value))}>Delete book</button>
        </main>
      </div>
    );
  }
}

export default connect()(App);
