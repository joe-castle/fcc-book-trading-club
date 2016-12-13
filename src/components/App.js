import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Divider } from 'material-ui'

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
        <Divider style={{ marginTop: '25px' }} />
        <footer style={{ maxWidth: '960px', margin: '25px auto', padding: '10px', textAlign: 'center' }}>
          Created as part of the <a href="http://www.freecodecamp.com" target="_blank">freecodecamp.com</a> curriculum. Source @ <a href="https://github.com/joesmith100/fcc-book-trading-club" target="_blank">GitHub</a>.
        </footer>
      </div>
    );
  }
}

export default App;
