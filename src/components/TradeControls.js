import React from 'react';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';

class TradeControls extends React.Component {
  constructor() {
    super();

    this.state = {
      inboundTradesOpen: false,
      outboundTradesOpen: false,
    }
  }

  render() {
    const { user } = this.props;

    return (
      <div style={{ margin: '25px 0' }}>
        <RaisedButton
          primary
          onTouchTap={() => this.setState({ outboundTradesOpen: !this.state.outboundTradesOpen })}
          label={`Your trade requests (${user.outboundTradeRequests.length}) outstanding`}
        />
        <RaisedButton
          style={{ marginLeft: '10px' }}
          secondary
          onTouchTap={() => this.setState({ inboundTradesOpen: !this.state.inboundTradesOpen })}
          label={`Trade requests for you (${user.outboundTradeRequests.length}) unnaproved`}
        />
        
      </div>
    );
  }
}

export default connect(state => ({ user: state.user }))(TradeControls);
