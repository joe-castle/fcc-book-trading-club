import axios from 'axios';
import EasyActions from 'redux-easy-actions';

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
    .catch(console.log);
};

Actions.DELETE_BOOK = bookId => (dispatch) => {
  axios
    .delete(`/api/books/${bookId}`)
    .then(() => {
      dispatch([
        Actions.REMOVE_BOOK(bookId),
        Actions.REMOVE_OWN_BOOK(bookId),
      ]);
    })
    .catch(console.log);
};

const PUT_BOOK = trade => bookId => (dispatch, getState) => {
  const userId = getState().user.id;

  axios
    .put(`/api/books/${bookId}?trade=${trade}`)
    .then(() => {
      dispatch(Actions[`TRADE_${trade.toUpperCase()}`](bookId, userId));
    })
    .catch(console.log);
};

Actions.PUT_TRADE_REQUEST = PUT_BOOK('request');
Actions.PUT_TRADE_CANCEL = PUT_BOOK('cancel');
Actions.PUT_TRADE_ACCEPT = PUT_BOOK('accept');
Actions.PUT_TRADE_REJECT = PUT_BOOK('reject');

Actions.SIGNUP = details => (dispatch) => {
  axios
    .post('/signup', details)
    .then(({ data }) => {
      dispatch(Actions.ADD_USER(data));
    })
    .catch(console.log);
};

Actions.LOGIN = details => (dispatch) => {
  axios
    .post('/login', details)
    .then(({ data }) => {
      dispatch(Actions.ADD_USER(data));
    })
    .catch(console.log);
};

Actions.LOGOUT = () => (dispatch) => {
  axios
    .post('/logout')
    .then(() => {
      dispatch(Actions.REMOVE_USER());
    })
    .catch(console.log);
};

Actions.PUT_USER = details => (dispatch) => {
  axios
    .put('/api/users', details)
    .then(({ data }) => {
      dispatch(Actions.UPDATE_USER(data));
    })
    .catch(console.log)
} 

export { Actions, Constants };
