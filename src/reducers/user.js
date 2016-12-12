import { Constants } from '../actions';

export default function users(state = {}, {
  type,
  bookId,
}) {
  switch (type) {
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

    default:
      return state;
  }
}
