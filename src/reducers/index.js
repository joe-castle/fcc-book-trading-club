import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import books from './books';
import user from './user';

export default combineReducers({
  books,
  user,
  routing: routerReducer,
});
