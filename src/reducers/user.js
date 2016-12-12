import { Constants } from '../actions';

export default function users(state = {}, {
  type,
  bookId,
  payload,
}) {
  switch (type) {
    case Constants.ADD_USER:
    case Constants.UPDATE_USER:
      return payload;

    case Constants.REMOVE_USER: return {};

    case Constants.ADD_OWN_BOOK:
      return {
        ...state,
        ownBooks: [...state.ownBooks, bookId],
      };

    case Constants.REMOVE_OWN_BOOK:
      return {
        ...state,
        ownBooks: state.ownBooks.filter(id => id !== bookId),
      };

    case Constants.TRADE_REQUEST:
      return {
        ...state,
        outboundTradeRequests: [...state.outboundTradeRequests, bookId],
      };

    case Constants.TRADE_CANCEL:
      return {
        ...state,
        outboundTradeRequests: state.outboundTradeRequests.filter(id => id !== bookId),
      };

    case Constants.TRADE_ACCEPT:
      return {
        ...state,
        ownBooks: state.ownBooks.filter(id => id !== bookId),
        inboundTradeRequests: state.inboundTradeRequests.filter(id => id !== bookId),
      };

    case Constants.TRADE_REJECT:
      return {
        ...state,
        inboundTradeRequests: state.inboundTradeRequests.filter(id => id !== bookId),
      };

    default: return state;
  }
}
