import React, { Component } from 'react';
import { Redirect } from '@reach/router';
// lib
import Auth from '../lib/auth';

const validationState = {
  validating: 'validating',
  notAdmin: 'not-admin',
  admin: 'admin',
};
export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: validationState.validating,
    };
  }
  isAdmin() {
    Auth.get('http://localhost:3030/authenticate').then((user) => {
      console.log(user.data);
      if (user.data.role === 'Admin') {
        this.setState({ status: validationState.admin });
      } else {
        this.setState({ status: validationState.notAdmin });
      }
    });
  }

  render() {
    switch (this.state.status) {
      case validationState.validating:
        return (
          <div>
            <button onClick={this.isAdmin.bind(this)}>Click</button>
          </div>
        );
      case validationState.admin: {
        return <div>Welcome Greg</div>;
      }

      default:
        return <Redirect to="/" noThrow />;
    }
  }
}
