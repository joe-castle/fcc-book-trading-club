import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';

import rootReducer from '../reducers';
import routes from '../routes/react';
import template from './template';

// TODO: provide INITIAL_STATE

const store = createStore(rootReducer);

export default (req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      // Provider allows connected components to get state properly
      res.send(template(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>,
        store.getState(),
      ));
    } else {
      res.status(404).send('Not Found');
    }
  });
};
