import React, { Component } from 'react';
import axios from 'axios';

// lib
import Auth from '../lib/auth';

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidated: false,
    };
  }
  isAdmin() {
    console.log(Auth);
    Auth.get('http://localhost:3030/authenticate');
  }

  render() {
    if (!this.state.isValidated) {
      return (
        <div>
          <button onClick={this.isAdmin.bind(this)}>Click</button>
        </div>
      );
    } else {
      return <div>Welcome Greg</div>;
    }
  }
}
