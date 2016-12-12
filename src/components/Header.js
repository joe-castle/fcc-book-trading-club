import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { AppBar, IconMenu, MenuItem, FlatButton, IconButton } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import { Actions } from '../actions';

function Login() {
  return (
    <div>
      <Link to="/login"><FlatButton label="Login" /></Link>
      <Link to="/signup"><FlatButton label="Signup" /></Link>
    </div>
  );
}

function Logged({ logOut }) {
  return (
    <IconMenu
      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <MenuItem primaryText="All Books" />
      <MenuItem primaryText="My Books" />
      <MenuItem primaryText="Settings" />
      <MenuItem
        onTouchTap={logOut}
        primaryText="Sign out"
      />
    </IconMenu>
  );
}

function Header({ user, dispatch }) {
  return (
    <AppBar
      showMenuIconButton={false}
      title="Book Traders"
      iconElementRight={
        user.id ? <Logged logOut={() => dispatch(Actions.LOGOUT())} /> : <Login />
      }
    />
  );
}

export default connect(state => ({ user: state.user }))(Header);