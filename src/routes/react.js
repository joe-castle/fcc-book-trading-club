import React from 'react';
import { Route } from 'react-router';

import App from '../components/App';
import Login from '../components/Login';
import Signup from '../components/Signup';
import AllBooks from '../components/AllBooks';

export default function (getState) {
  function requireAuth(nextState, replace) {
    if (!getState().user.id) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname },
      });
    }
  }

  return (
    <Route path="/" component={App}>
      <Route path="AllBooks" component={AllBooks} onEnter={requireAuth} />
      <Route path="signup" component={Signup} />
      <Route path="login" component={Login} />
    </Route>
  );
};
