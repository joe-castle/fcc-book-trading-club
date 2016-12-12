import { Constants } from '../actions';

export default function books(state = [], {
  type,
  payload,
  bookId,
  userId,
}) {
  switch (type) {
    case Constants.ADD_BOOK:
      return [
        ...state,
        payload,
      ];

    case Constants.REMOVE_BOOK:
      return state.filter(book => book.id !== bookId);

    case Constants.TRADE_REQUEST: {
      const index = state.findIndex(book => book.id === bookId);

      return [
        ...state.slice(0, index),
        {
          ...state[index],
          requestedForTradeBy: userId,
        },
        ...state.slice(index + 1),
      ];
    }

    case Constants.TRADE_CANCEL:
    case Constants.TRADE_REJECT: {
      const index = state.findIndex(book => book.id === bookId);

      return [
        ...state.slice(0, index),
        {
          ...state[index],
          requestedForTradeBy: '',
        },
        ...state.slice(index + 1),
      ];
    }

    case Constants.TRADE_ACCEPT: {
      const index = state.findIndex(book => book.id === bookId);

      return [
        ...state.slice(0, index),
        {
          ...state[index],
          requestedForTradeBy: '',
          owner: state[index].requestedForTradeBy,
        },
        ...state.slice(index + 1),
      ];
    }

    default: return state;
  }
}
