import React from 'react';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';
import TextField from 'material-ui/TextField';

import { Actions } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }
  render() {
    return (
      <div>
        <h1>Login</h1>
        <form
          onSubmit={(ev) => {
            ev.preventDefault();

            this.props.dispatch(Actions.LOGIN({
              email: this.state.email,
              password: this.state.password,
            }));
          }}
        >
          <TextField
            onChange={ev => this.setState({ email: ev.target.value })}
            style={{ display: 'block', width: '100%' }}
            type="email"
            hintText="E-mail"
          />
          <TextField
            onChange={ev => this.setState({ password: ev.target.value })}
            style={{ display: 'block', width: '100%' }}
            type="password"
            hintText="Password"
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

export default connect()(Login);
