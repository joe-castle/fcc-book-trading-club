import React from 'react';
import { Route } from 'react-router';

import App from '../components/App';
import Login from '../components/Login';
import Signup from '../components/Signup';
import AllBooks from '../components/AllBooks';

export default (
  <Route path="/" component={App}>
    <Route path="AllBooks" component={AllBooks} />
    <Route path="signup" component={Signup} />
    <Route path="login" component={Login} />
  </Route>
);
