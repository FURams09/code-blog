const express = require('express');
const cors = require('cors');
const app = express();


// Google Authentication
// https://developers.google.com/identity/sign-in/web/backend-auth
const GoogleConfiguration = require('../credentials.json');
const {OAuth2Client} = require('google-auth-library');
const GOOGLE_CLIENT_ID = GoogleConfiguration.web.client_id;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);



app.use(cors({ origin: 'http://localhost:8000' })); // Gatsby dev port
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: 'application/json' }));

/**
 * send the id_token in the header.authorization
 */
app.post('/auth', async (req, res) => {
  console.log(req.headers.authorization)
  const ticket = await client.verifyIdToken({
    idToken: req.headers.authorization,
    audience: GOOGLE_CLIENT_ID
  })
  console.log(ticket.getPayload())
  res.send();
})
app.listen(3030, () => {
  console.log(`http://localhost:3030 listening for Auth`);
})