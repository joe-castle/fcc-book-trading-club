import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import { MuiThemeProvider } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import rootReducer from '../reducers';
import routes from '../routes/react';
import template from './template';

import Users from '../models/Users';
import Books from '../models/Books';

export default (req, res) => {
  const { user } = req;

  match({
    routes: routes(() => ({ user })),
    location: req.url,
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      Books.get()
        .then((books) => {
          const initialState = { books };

          if (user) initialState.user = user.exclude('password');

          const store = createStore(rootReducer, initialState);

          res.send(template(
            <MuiThemeProvider
              muiTheme={getMuiTheme({ userAgent: req.headers['user-agent'] })}
            >
              <Provider store={store}>
                <RouterContext {...renderProps} />
              </Provider>
            </MuiThemeProvider>,
            store.getState(),
          ));
        });
    } else {
      res.status(404).send('Not Found');
    }
  });
};
