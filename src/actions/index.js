import axios from 'axios';
import EasyActions from 'redux-easy-actions';

const { Actions, Constants } = EasyActions({
  ADD_BOOK: payload => ({ payload }),
  ADD_OWN_BOOK: bookId => ({ bookId }),
  REMOVE_BOOK: bookId => ({ bookId }),
  REMOVE_OWN_BOOK: bookId => ({ bookId }),
  TRADE_REQUEST: bookId => ({ bookId }),
  TRADE_CANCEL: bookId => ({ bookId }),
  TRADE_ACCEPT: bookId => ({ bookId }),
  TRADE_REJECT: bookId => ({ bookId }),
});

const POST_BOOK = title => (dispatch) => {
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

const DELETE_BOOK = bookId => (dispatch) => {
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

const PUT_BOOK = trade => bookId => (dispatch) => (
  axios
    .put(`/api/books/${bookId}?trade=${trade}`)
    .then(() => {
      dispatch(Actions[`TRADE_${trade}`]);
    })
    .catch(console.log)
);

const PUT_TRADE_REQUEST = PUT_BOOK('request');
const PUT_TRADE_CANCEL = PUT_BOOK('cancel');
const PUT_TRADE_ACCEPT = PUT_BOOK('accept');
const PUT_TRADE_REJECT = PUT_BOOK('reject');


export { Actions, Constants };
export {
  POST_BOOK,
  DELETE_BOOK,
  PUT_TRADE_REQUEST,
  PUT_TRADE_CANCEL,
  PUT_TRADE_ACCEPT,
  PUT_TRADE_REJECT,
};
