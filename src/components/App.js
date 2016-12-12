import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { Actions } from '../actions';

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
          <button onClick={() => dispatch(Actions.POST_BOOK(this.title.value))}>Add book</button>

          <input ref={(c) => { this.id = c; }} />
          <button onClick={() => dispatch(Actions.DELETE_BOOK(this.id.value))}>Delete book</button>

          <input ref={(c) => { this.request = c; }} />
          <button onClick={() => dispatch(Actions.PUT_TRADE_REQUEST(this.request.value))}>Request Trade</button>
          
          <input ref={(c) => { this.cancel = c; }} />
          <button onClick={() => dispatch(Actions.PUT_TRADE_CANCEL(this.cancel.value))}>Cancel Trade</button>

          <input ref={(c) => { this.accept = c; }} />
          <button onClick={() => dispatch(Actions.PUT_TRADE_ACCEPT(this.accept.value))}>Accept Trade</button>

          <input ref={(c) => { this.reject = c; }} />
          <button onClick={() => dispatch(Actions.PUT_TRADE_REJECT(this.reject.value))}>Reject Trade</button>
        </main>
      </div>
    );
  }
}

export default connect()(App);
