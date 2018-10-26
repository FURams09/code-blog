// server
const express = require('express');
const cors = require('cors');

// data
const mongoose = require('mongoose');
const connect = require('./database/mongo');

// logging
const logger = require('../lib/logger');
const morgan = require('morgan');

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
app.use(morgan('tiny'));

/*PUBLIC ROUTES */
app.post('/register', async (req, res) => {
  const { firstName, lastName, email } = req.body;
  if (!firstName || !lastName || !email) {
    res.status(400).send(`invalid request ${req}`);
  }
  googleUser = new User({
    firstName,
    lastName,
    email,
    role: 'Pending',
  });
  googleUser.save().catch((ex) => {
    res.send(ex);
  });
  res.send(googleUser);
});

/*PRIVATE ROUTES */
const authenticate = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  try {
    if (authorizationHeader) {
      const sentToken = req.headers.authorization.split(' ')[1]; // Bearer <token>

      const session = await Session.findOne({ token: sentToken }).catch(
        (ex) => {
          logger.error(`Session Not Found: ${ex}`);
          res.status(401).send(ex);
        }
      );
      req.session = session;
      next();
    } else {
      throw new Exception(
        'Authentication Header Missing from Restricted Route'
      );
    }
  } catch (ex) {
    logger.error(ex);
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
    res.status(400).send(`User Not Found`);
  }
  let sessionUser = {
    email: googleUser.email,
    role: googleUser.role,
  };
  let newSession = new Session({ token: access_token, user: sessionUser });
  await newSession.save();
  res.send(googleUser);
});

app.get('/authenticate', authenticate, (req, res) => {
  res.send(req.session.user);
});

app.get('/logout', authenticate, async (req, res) => {
  try {
    await Session.deleteMany({ token: req.session.token });

    res.send({ session: req.session.token });
  } catch (ex) {
    logger.error(`Error ending session ${req.session.token}: ${ex}`);
    res.status(500).send(`Error ending session: ${ex}`);
  }
});

app.get('/users', authenticate, async (req, res) => {
  let users = await User.find({}).catch((ex) => {
    res.status(500).send(ex);
  });
  res.send(users);
});

app.put('/user/', async (req, res) => {
  let user = await User.findById(req.body._id).catch((ex) => {
    res.status(500).send(ex);
  });
  if (user.role === 'Admin') {
    res.send(`Cannot downgrade Admin to Viewer.`);
  }
  user.role = req.body.role;
  user.save().catch((ex) => res.status(500).send(ex));
  res.send(user);
});

app.delete('/user/:_id', authenticate, async (req, res) => {
  const userId = req.params._id;
  let users = await User.findByIdAndRemove(userId).catch((ex) => {
    res.status(500).send(ex);
  });
  res.send(users);
});

app.get('/', authenticate, (req, res) => {
  res.send('gotten');
});
app.listen(3030, () => {
  logger.info(`http://localhost:3030 listening for Auth`);
});
