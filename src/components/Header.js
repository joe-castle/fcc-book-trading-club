import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { AppBar, IconMenu, MenuItem, FlatButton, IconButton } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import { Actions } from '../actions';

function Login() {
  return (
    <div style={{ marginTop: '5px' }}>
      <Link to="/login"><FlatButton style={{ color: '#fff' }} label="Login" /></Link>
      <Link to="/signup"><FlatButton style={{ color: '#fff' }} label="Signup" /></Link>
    </div>
  );
}

function Logged({ logOut }) {
  return (
    <IconMenu
      iconButtonElement={<IconButton><MoreVertIcon style={{ color: '#fff' }} /></IconButton>}
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <Link style={{ textDecoration: 'none' }} to="/allbooks"><MenuItem primaryText="All Books" /></Link>
      <Link style={{ textDecoration: 'none' }} to="/mybooks"><MenuItem primaryText="My Books" /></Link>
      <Link style={{ textDecoration: 'none' }} to="/settings"><MenuItem primaryText="Settings" /></Link>
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