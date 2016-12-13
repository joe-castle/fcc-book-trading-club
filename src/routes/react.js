import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components/App';
import Home from '../components/Home';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Settings from '../components/Settings';
import AllBooks from '../components/AllBooks';
import MyBooks from '../components/MyBooks';

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
      <IndexRoute component={Home} />
      <Route path="allbooks" component={AllBooks} onEnter={requireAuth} />
      <Route path="mybooks" component={MyBooks} onEnter={requireAuth} />
      <Route path="signup" component={Signup} />
      <Route path="login" component={Login} />
      <Route path="settings" component={Settings} onEnter={requireAuth} />
    </Route>
  );
}
