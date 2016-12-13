import { Constants } from '../actions';

export default function books(state = { open: false }, {
  type,
  message,
}) {
  switch (type) {
    case Constants.OPEN_ERROR:
      return {
        open: true,
        message,
      };

    case Constants.CLOSE_ERROR:
      return {
        open: false,
      };

    default: return state;
  }
}
