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
const Session = require('./models/session');

// Google Authentication
// https://developers.google.com/identity/sign-in/web/backend-auth
const GoogleConfiguration = require('../credentials.json');
const { OAuth2Client } = require('google-auth-library');
const GOOGLE_CLIENT_ID = GoogleConfiguration.web.client_id;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

app.use(cors({ origin: 'http://localhost:8000', credentials: true })); // Gatsby dev port
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: 'application/json' }));
/*PUBLIC ROUTES */
app.post('/register', (req, res) => {
  const { name, email } = req;
  if (!name || !email) {
    res.statusCode(400);
  }
});

/*PRIVATE ROUTES */
const authenticate = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  try {
    if (authorizationHeader) {
      const sentToken = req.headers.authorization.split(' ')[1]; // Bearer <token>

      Session.findOne({ token: sentToken })
        .populate('user')
        .then((session) => {
          console.log(session);
          req.session = session;
        })
        .catch((ex) => {
          console.log(`Session Not Found: ${ex}`);
          res.status(401).send(ex);
        });

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
app.post('/login', async (req, res) => {
  const { id_token, access_token } = req.body.authorizationTicket;
  const ticket = await client.verifyIdToken({
    idToken: req.body.authorizationTicket.id_token,
    audience: GOOGLE_CLIENT_ID,
  });

  const loginReq = ticket.getPayload();
  // Find out if user is in database
  // if user is pending, let them know
  //if user if not in db return them to their homepage
  const googleUser = await User.findOne({ email: loginReq.email });
  if (googleUser.length === 0) {
    googleUser = new User({
      firstName: loginReq.given_name,
      lastName: loginReq.family_name,
      email: loginReq.email,
      role: 'PENDING',
    });
    googleUser.save();
  }
  let sessionUser = {
    email: googleUser.email,
    role: googleUser.role,
  };
  let newSession = new Session({ token: access_token, user: sessionUser });
  console.log(newSession);
  await newSession.save();
  res.send(googleUser);
});

app.get('/logout', authenticate, async (req, res) => {
  session = await Session.find({ token: req.session.token }).catch((ex) => {
    res.status(500).send(`Error ending session: ${ex}`);
  });

  await Session.deleteMany(session);
  res.send({ session: req.session.token });
});

app.get('/authenticate', authenticate, (req, res) => {
  console.log(req.session);
  res.send(req.token);
});

app.get('/', authenticate, (req, res) => {
  res.send('gotten');
});
app.listen(3030, () => {
  console.log(`http://localhost:3030 listening for Auth`);
});
