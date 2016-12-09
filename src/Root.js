import React, { PropTypes } from 'react';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import routes from './routes/react';

function Root({ store }) {
  return (
    <Router
      history={syncHistoryWithStore(browserHistory, store)}
      routes={routes}
    />
  );
}

Root.propTypes = {
  store: PropTypes.shape({
    getState: PropTypes.func,
    dispatch: PropTypes.func,
    subscribe: PropTypes.func,
  }),
};

export default Root;
