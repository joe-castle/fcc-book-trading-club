import { Constants } from '../actions';

export default function books(state = [], {
  type,
  payload,
  bookId,
}) {
  switch (type) {
    case Constants.ADD_BOOK:
      return [
        ...state,
        payload,
      ];

    case Constants.REMOVE_BOOK:
      return state.filter(book => book.id !== bookId);

    case Constants.TRADE_REQUEST:
      

    default:
      return state;
  }
}
