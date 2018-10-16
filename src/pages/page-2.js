import React, { Component } from 'react'
import { Link } from 'gatsby'

import {Redirect} from '@reach/router';
import Layout from '../components/layout';
import { GoogleLogout } from 'react-google-login';

class SecondPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true
    }
  }

  logout() {
    this.setState({
      loggedIn: false
    })
  } 
  render() {
    if (!(this.state.loggedIn)) {
      return <Redirect to="/" noThrow/>
    }
    return (
      <Layout>
        <h1>Hi from the second page</h1>
        <p>Welcome to page 2</p>
        <Link to="/">Go back to the homepage</Link>
        <GoogleLogout
          style={{padding: "10px 20px"}}
          buttonText="Logout"
          onLogoutSuccess={this.logout.bind(this)}
          
        />
      </Layout>
    )
  }
 
} 

export default SecondPage
