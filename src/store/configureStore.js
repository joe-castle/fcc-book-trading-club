import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from '../reducers';

const arrayMiddleWare = ({ dispatch }) => next => (action) => {
  if (Array.isArray(action)) return action.forEach(item => dispatch(item));

  return next(action);
};

export default (initialState) => {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(thunk, arrayMiddleWare, routerMiddleware(browserHistory)),
    window.devToolsExtension && module.hot ? window.devToolsExtension() : f => f,
  ));

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      /* eslint-disable global-require */
      store.replaceReducer(require('../reducers').default),
      /* eslint-disable global-require */
    );
  }

  return store;
};
