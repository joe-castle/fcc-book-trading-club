import React from 'react';
import { connect } from 'react-redux';

function TradeControls({ user }) {
  return (

  );
}

export default connect(state => ({ user: state.user }))(TradeControls);