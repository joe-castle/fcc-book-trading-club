import axios from 'axios';
import EasyActions from 'redux-easy-actions';
import { push } from 'react-router-redux';

const { Actions, Constants } = EasyActions({
  ADD_BOOK: (type, payload) => ({ type, payload }),
  ADD_OWN_BOOK: (type, bookId) => ({ type, bookId }),
  REMOVE_BOOK: (type, bookId) => ({ type, bookId }),
  REMOVE_OWN_BOOK: (type, bookId) => ({ type, bookId }),
  TRADE_REQUEST: (type, bookId, userId) => ({ type, bookId, userId }),
  TRADE_CANCEL: (type, bookId, userId) => ({ type, bookId, userId }),
  TRADE_ACCEPT: (type, bookId, userId) => ({ type, bookId, userId }),
  TRADE_REJECT: (type, bookId, userId) => ({ type, bookId, userId }),
  ADD_USER: (type, payload) => ({ type, payload }),
  UPDATE_USER: (type, payload) => ({ type, payload }),
  REMOVE_USER: type => ({ type }),
  OPEN_ERROR: (type, message) => ({ type, message }),
  CLOSE_ERROR: (type, message) => ({ type, message }),
});

Actions.POST_BOOK = title => (dispatch) => {
  axios
    .post(`/api/books/${title}`)
    .then(({ data }) => {
      dispatch([
        Actions.ADD_BOOK(data),
        Actions.ADD_OWN_BOOK(data.id),
      ]);
    })
    .catch(({ response }) => dispatch(Actions.OPEN_ERROR(response.data)));
};

Actions.DELETE_BOOK = bookId => (dispatch) => {
  axios
    .delete(`/api/books/${bookId}`)
    .then(() => {
      dispatch([
        Actions.REMOVE_OWN_BOOK(bookId),
        Actions.REMOVE_BOOK(bookId),
      ]);
    })
    .catch(({ response }) => dispatch(Actions.OPEN_ERROR(response.data)));
};

const PUT_BOOK = trade => bookId => (dispatch, getState) => {
  const userId = getState().user.id;

  axios
    .put(`/api/books/${bookId}?trade=${trade}`)
    .then(() => {
      dispatch(Actions[`TRADE_${trade.toUpperCase()}`](bookId, userId));
    })
    .catch(({ response }) => dispatch(Actions.TOGGLE_ERROR(response.data)));
};

Actions.PUT_TRADE_REQUEST = PUT_BOOK('request');
Actions.PUT_TRADE_CANCEL = PUT_BOOK('cancel');
Actions.PUT_TRADE_ACCEPT = PUT_BOOK('accept');
Actions.PUT_TRADE_REJECT = PUT_BOOK('reject');

Actions.SIGNUP = details => (dispatch) => {
  axios
    .post('/signup', details)
    .then(({ data }) => {
      dispatch([
        Actions.ADD_USER(data),
        push('/mybooks'),
      ]);
    })
    .catch(({ response }) => dispatch(Actions.OPEN_ERROR(response.data)));
};

Actions.LOGIN = details => (dispatch) => {
  axios
    .post('/login', details)
    .then(({ data }) => {
      dispatch([
        Actions.ADD_USER(data),
        push('/mybooks'),
      ]);
    })
    .catch(({ response }) => dispatch(Actions.OPEN_ERROR(response.data)));
};

Actions.LOGOUT = () => (dispatch) => {
  axios
    .post('/logout')
    .then(() => {
      dispatch([
        push('/login'),
        Actions.REMOVE_USER(),
      ]);
    })
    .catch(({ response }) => dispatch(Actions.OPEN_ERROR(response.data)));
};

Actions.PUT_USER = details => (dispatch) => {
  axios
    .put('/api/users', details)
    .then(({ data }) => {
      dispatch([
        Actions.UPDATE_USER(data),
        Actions.OPEN_ERROR('Deetails updated.'),
      ]);
    })
    .catch(({ response }) => dispatch(Actions.OPEN_ERROR(response.data)))
} 

export { Actions, Constants };
