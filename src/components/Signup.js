import React from 'react';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';
import TextField from 'material-ui/TextField';

import { Actions } from '../actions';

class Signup extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }

  render() {
    return (
      <div>
        <h1>Signup</h1>
        <form
          onSubmit={(ev) => {
            ev.preventDefault();

            this.props.dispatch(Actions.SIGNUP({
              name: this.state.name,
              email: this.state.email,
              password: this.state.password,
            }));
          }}
        >
          <TextField
            onChange={ev => this.setState({ name: ev.target.value })}
            style={{ display: 'block', width: '100%' }}
            hintText="Name"
          />
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

export default connect()(Signup);
