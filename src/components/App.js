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
        <main style={{ maxWidth: '960px', margin: '0 auto', padding: '10px' }}>
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default App;
