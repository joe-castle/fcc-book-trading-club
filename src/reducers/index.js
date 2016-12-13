import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import books from './books';
import user from './user';
import error from './error';

export default combineReducers({
  books,
  user,
  error,
  routing: routerReducer,
});
