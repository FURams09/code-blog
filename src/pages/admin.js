import React, { Component } from 'react';
import { Redirect } from '@reach/router';
// lib
import Auth from '../lib/auth';

// components
import Layout from '../components/layout';
import Axios from 'axios';

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
      getUsers: false,
      users: [],
    };
  }
  isAdmin() {
    Auth.get('http://localhost:3030/authenticate').then((user) => {
      if (user.data.role === 'Admin') {
        this.setState({ status: validationState.admin, getUsers: true });
      } else {
        this.setState({ status: validationState.notAdmin });
      }
    });
  }

  componentDidUpdate() {
    console.log(this.state);
    if (this.state.status === validationState.admin && this.state.getUsers) {
      Auth.get('http://localhost:3030/users').then((users) => {
        this.setState({ users: users.data });
      });
      this.setState({ getUsers: false });
    }
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
        let userDisplay = this.state.users.map((user) => {
          return <li>{`${user.firstName} ${user.lastName}: ${user.role}`}</li>;
        });
        return (
          <Layout>
            <div>Welcome Greg</div>
            <ul>{userDisplay}</ul>
          </Layout>
        );
      }

      default:
        return <Redirect to="/" noThrow />;
    }
  }
}
