import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import './assets/stylus/main.styl';

import configureStore from './store/configureStore';

import Root from './Root';

const store = configureStore(window.INITIAL_STATE);

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <Root store={store} />
    </Provider>
  </AppContainer>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept('./Root', () => {
    /* eslint-disable global-require */
    const NewRoot = require('./Root').default;
    /* eslint-disable global-require */

    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <NewRoot store={store} />
        </Provider>
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}
