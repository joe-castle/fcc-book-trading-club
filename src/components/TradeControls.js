import React from 'react';
import { connect } from 'react-redux';
import { RaisedButton, List, ListItem, Subheader, Divider } from 'material-ui';
import Clear from 'material-ui/svg-icons/content/clear';
import Done from 'material-ui/svg-icons/action/done';

import { Actions } from '../actions';

class TradeControls extends React.Component {
  constructor() {
    super();

    this.state = {
      inboundTradesOpen: false,
      outboundTradesOpen: false,
    }
  }

  render() {
    const { user, books, dispatch } = this.props;

    return (
      <div style={{ margin: '25px 0' }}>
        <RaisedButton
          primary
          style={{ marginRight: '10px', marginBottom: '10px' }}
          onTouchTap={() => this.setState({ outboundTradesOpen: !this.state.outboundTradesOpen })}
          label={`Your trade requests (${user.outboundTradeRequests.length}) outstanding`}
        />
        <RaisedButton
          secondary
          onTouchTap={() => this.setState({ inboundTradesOpen: !this.state.inboundTradesOpen })}
          label={`Trade requests for you (${user.inboundTradeRequests.length}) unnaproved`}
        />
        {this.state.outboundTradesOpen && <List>
          <Subheader>Outstanding Requests:</Subheader>
          <Divider />
          {user.outboundTradeRequests.map(request => {
            const book = books.find(book => book.id === request);

            return (
              <ListItem
                primaryText={book.title}
                rightIconButton={
                  <Clear
                    onTouchTap={() => dispatch(Actions.PUT_TRADE_CANCEL(book.id))}
                    style={{ marginTop: '12px', color: 'red' }}
                  />
                }
              />
            );
          })}
        </List>}

        {this.state.inboundTradesOpen && <List>
          <Subheader>Unapproved Requests:</Subheader>
          <Divider />
          {user.inboundTradeRequests.map((request) => {
            const book = books.find(book => book.id === request);

            return (
              <ListItem
                primaryText={book.title}
                rightIconButton={
                  <div style={{ marginTop: '12px' }}>
                    <Clear
                      onTouchTap={() => dispatch(Actions.PUT_TRADE_REJECT(book.id))}
                      style={{ marginRight: '10px', color: 'red' }}
                    />
                    <Done
                      onTouchTap={() => dispatch(Actions.PUT_TRADE_ACCEPT(book.id))}
                      style={{ color: 'green' }}
                    />
                  </div>
                }
              />
            );
          })}
        </List>}
      </div>
    );
  }
}

export default connect(state => ({
  books: state.books,
  user: state.user,
}))(TradeControls);
