import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { MuiThemeProvider } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';

import './assets/stylus/main.styl';

import configureStore from './store/configureStore';

import Root from './Root';

const store = configureStore(window.INITIAL_STATE);
injectTapEventPlugin();

ReactDOM.render(
  <AppContainer>
    <MuiThemeProvider>
      <Provider store={store}>
        <Root store={store} />
      </Provider>
    </MuiThemeProvider>
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
        <MuiThemeProvider>
          <Provider store={store}>
            <NewRoot store={store} />
          </Provider>
        </MuiThemeProvider>
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}
