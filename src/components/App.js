import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Header from './Header';

export class App extends React.Component {
  static propTypes = {
    children: PropTypes.element,
  };

  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <h1>Book Trading Club</h1>
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default App;
