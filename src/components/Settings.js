import React from 'react';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';
import TextField from 'material-ui/TextField';

import { Actions } from '../actions';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: props.user.city,
      state: props.user.state,
      oldPassword: '',
      newPassword: '',
    };
  }

  render() {
    return (
      <div>
        <h1>Update Profile</h1>
        <form
          onSubmit={(ev) => {
            ev.preventDefault();

            this.props.dispatch(Actions.PUT_USER({
              city: this.state.city,
              state: this.state.state,
            }));
          }}
        >
          <TextField
            onChange={ev => this.setState({ city: ev.target.value })}
            style={{ display: 'block', width: '100%' }}
            hintText="City"
            value={this.state.city}
          />
          <TextField
            onChange={ev => this.setState({ state: ev.target.value })}
            style={{ display: 'block', width: '100%' }}
            hintText="State"
            value={this.state.state}
          />
          <RaisedButton
            style={{ display: 'block' }}
            type="submit"
            label="Submit"
            primary
          />
        </form>
        <h1>Change Password</h1>
        <form
          onSubmit={(ev) => {
            ev.preventDefault();

            this.props.dispatch(Actions.PUT_USER({
              oldPassword: this.state.oldPassword,
              newPassword: this.state.newPassword,
            }));

            this.setState({ oldPassword: '', newPassword: '' });
          }}
        >
          <TextField
            onChange={ev => this.setState({ oldPassword: ev.target.value })}
            style={{ display: 'block', width: '100%' }}
            type="password"
            hintText="Old Password"
            value={this.state.oldPassword}
          />
          <TextField
            onChange={ev => this.setState({ newPassword: ev.target.value })}
            style={{ display: 'block', width: '100%' }}
            type="password"
            hintText="New Password"
            value={this.state.newPassword}
          />
          <RaisedButton
            style={{ display: 'block' }}
            type="submit"
            label="Submit"
            primary={true}
          />
        </form>
      </div>
    );
  }
}

export default connect(state => ({ user: state.user }))(Settings);
