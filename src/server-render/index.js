import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';

import rootReducer from '../reducers';
import routes from '../routes/react';
import template from './template';

import Users from '../models/Users';
import Books from '../models/Books';

export default (req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      Promise.all([Books.get(), req.user && Users.get(req.user.id)])
        .then(([books, user]) => {
          const initialState = { books };

          if (user) initialState.user = user.exclude('password');

          const store = createStore(rootReducer, initialState);

          res.send(template(
            // Provider allows connected components to get state properly
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>,
            store.getState(),
          ));
        });
    } else {
      res.status(404).send('Not Found');
    }
  });
};
