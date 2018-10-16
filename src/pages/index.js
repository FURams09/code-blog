import React, { Component } from 'react';
import { Link,  } from 'gatsby';
import axios from 'axios';

import {Redirect} from '@reach/router';

import { GoogleLogin } from 'react-google-login';
import GoogleCredentials from '../../credentials.json';
import Layout from '../components/layout';

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
  }
  loginSuccess(e) {
    console.log(e);
    axios.post('http://localhost:3030/auth', {
      e
    }).then(
      this.setState({
        loggedIn: true
      })
    ).catch((ex) => {
      console.log(ex);
    })
    
  }
  loginError(e) {
    console.log(e);
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/page-2/" noThrow/>
    }
    return (
      <Layout>
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <Link to="/page-2/">Go to page 2</Link>
        <GoogleLogin 
          style={{padding:"10px 20px", display: "block"}}
          clientId={GoogleCredentials.web.client_id}
          buttonText="Open with Google"
          onSuccess={this.loginSuccess.bind(this)}
          onFailure={this.loginError.bind(this)}
        />
      </Layout>
    )
  }
}

export default IndexPage
