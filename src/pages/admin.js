import React, { Component } from 'react';
import { Redirect } from '@reach/router';
// lib
import Auth from '../../lib/auth';

// components
import Layout from '../components/layout';

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
      loading: false,
      users: [],
      awaitingUpdate: false,
      adminUser: {},
    };
  }
  componentDidMount() {
    Auth.get('http://localhost:3030/authenticate').then((user) => {
      if (user.data.role === 'Admin') {
        this.setState({
          status: validationState.admin,
          loading: true,
          currentUser: user.data.name || user.data.email,
        });
      } else {
        this.setState({ status: validationState.notAdmin });
      }
    });
  }

  componentDidUpdate() {
    if (this.state.status === validationState.admin && this.state.loading) {
      Auth.get('http://localhost:3030/users').then((users) => {
        this.setState({ users: users.data });
      });
      this.setState({ loading: false });
    }
  }
  deleteUser(_id, name) {
    let r = window.confirm(`Delete ${name}`);
    if (r) {
      Auth.delete(`http://localhost:3030/user/${_id}`).then((res) => {
        Auth.get('http://localhost:3030/users').then((users) => {
          this.setState({ users: users.data });
        });
      });
    }
  }

  validateUser(_id) {
    const body = {
      _id,
      role: 'Viewer',
    };
    Auth.post(`http://localhost:3030/user`, body).then((res) => {
      Auth.get('http://localhost:3030/users').then((users) => {
        this.setState({ users: users.data });
      });
    });
  }
  render() {
    switch (this.state.status) {
      case validationState.validating:
        return (
          <div>
            <div>loading</div>
          </div>
        );
      case validationState.admin: {
        let userDisplay = this.state.users.map((user) => {
          return (
            <tr key={user._id}>
              <td>{`${user.firstName}${user.lastName}`}</td>
              <td>{user.role}</td>
              <td>
                <button
                  onClick={() => this.deleteUser(user._id, user.firstName)}
                >
                  delete
                </button>
                <button onClick={() => this.validateUser(user._id)}>
                  Grant Access
                </button>
              </td>
            </tr>
          );
        });
        return (
          <Layout showHeader>
            <div>
              <div>Welcome {this.state.currentUser}</div>
              <table style={{ maxWidth: `500px`, margin: `0 10px` }}>
                <tbody>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th />
                  </tr>
                  {userDisplay}
                </tbody>
              </table>
            </div>
          </Layout>
        );
      }

      default:
        return <Redirect to="/" noThrow />;
    }
  }
}
