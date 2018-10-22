const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const connect = require('./database/mongo');
// Removes deprecation warning for collection.ensureIndex
// https://mongoosejs.com/docs/deprecations.html
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const app = express();
connect();

const User = require('./models/user');

// Google Authentication
// https://developers.google.com/identity/sign-in/web/backend-auth
const GoogleConfiguration = require('../credentials.json');
const { OAuth2Client } = require('google-auth-library');
const GOOGLE_CLIENT_ID = GoogleConfiguration.web.client_id;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

app.use(cors({ origin: 'http://localhost:8000', credentials: true })); // Gatsby dev port
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: 'application/json' }));

const authenticate = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  let result;
  try {
    if (authorizationHeader) {
      const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
      req.token = token;
      next();
    } else {
      throw new Exception(
        'Authentication Header Missing from Restricted Route'
      );
    }
  } catch (ex) {
    res.status(401).send(ex);
  }
};
/**
 * send the id_token in the header.authorization
 */
app.post('/auth', async (req, res) => {
  const { id_token, access_token } = req.body.authorizationTicket;
  const ticket = await client.verifyIdToken({
    idToken: req.body.authorizationTicket.id_token,
    audience: GOOGLE_CLIENT_ID,
  });

  const loginReq = ticket.getPayload();
  // Find out if user is in database
  // if user is pending, let them know
  //if user if not in db return them to their homepage
  const googleUser = await User.find({ email: loginReq.email });
  if (googleUser.length === 0) {
    googleUser = new User({
      firstName: loginReq.given_name,
      lastName: loginReq.family_name,
      email: loginReq.email,
      role: 'PENDING',
    });
  }
  googleUser.sessionToken = access_token;
  // googleUser.save();
  res.send(googleUser);
});

app.get('/', authenticate, (req, res) => {
  res.send('gotten');
});
app.listen(3030, () => {
  console.log(`http://localhost:3030 listening for Auth`);
});
