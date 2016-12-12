import axios from 'axios';
import EasyActions from 'redux-easy-actions';

const { Actions, Constants } = EasyActions({
  ADD_BOOK: payload => ({ payload }),
  ADD_OWN_BOOK: bookId => ({ bookId }),
  REMOVE_BOOK: bookId => ({ bookId }),
  REMOVE_OWN_BOOK: bookId => ({ bookId }),
  TRADE_REQUEST: (bookId, userId) => ({ bookId, userId }),
  TRADE_CANCEL: (bookId, userId) => ({ bookId, userId }),
  TRADE_ACCEPT: (bookId, userId) => ({ bookId, userId }),
  TRADE_REJECT: (bookId, userId) => ({ bookId, userId }),
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

  return axios
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

export { Actions, Constants };
