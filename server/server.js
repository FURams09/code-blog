// server
const express = require('express');
const cors = require('cors');

// data
const mongoose = require('mongoose');
const connect = require('./database/mongo');

// logging
const { logger, debugLogger } = require('../lib/logger');
const morgan = require('morgan');

const AuthLogger = logger(`Auth`);
const UserLogger = logger(`User API`);
const DebugLogger = debugLogger();
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
/**
 * Ensures that any request to a restricted route has a Bearer token with the session ID
 */

/**
 * Express middleware to make sure that header has Bearer token and then attaches
 * the session to the request.
 *
 */

// TODO: Add role based validation, currently just makes sure the user has as session
const authenticate = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  try {
    if (authorizationHeader) {
      const sentToken = req.headers.authorization.split(' ')[1]; // Bearer <token>

      const session = await Session.findOne({ token: sentToken }).catch(
        (ex) => {
          AuthLogger.error(`Session Not Found: ${ex}`);
          res.status(401).send(ex);
        }
      );

      req.session = session;
      console.log(req.session);
      next();
    } else {
      AuthLogger.warn(`Unauthorized Request`);
      res.status(401).send([]);
    }
  } catch (ex) {
    AuthLogger.error(ex);
    res.status(500).send(ex);
  }
};

/**
 * used to test authenticator middleware
 */
app.get('/', authenticate, (req, res) => {
  res.send('gotten');
});

/**
 * validates the id_token with Google Auth Server, then creates a session for the provided access_token.
 * The access_token is then used as the bearer token for future requests.
 */
app.post('/login', async (req, res) => {
  const { id_token, access_token } = req.body.authorizationTicket;
  const ticket = await client.verifyIdToken({
    idToken: req.body.authorizationTicket.id_token,
    audience: GOOGLE_CLIENT_ID,
  });

  const loginReq = ticket.getPayload();
  AuthLogger.trace(`Login Ticket Validated: ${JSON.stringify(loginReq)}`);
  // Find out if user is in database
  // if user is pending, let them know
  //if user if not in db return them to their homepage
  const googleUser = await User.findOne({ email: loginReq.email });
  if (googleUser.length === 0) {
    res.status(400).send(`User Not Found`);
  }
  let sessionUser = {
    name: googleUser.name,
    email: googleUser.email,
    role: googleUser.role,
  };
  let newSession = new Session({ token: access_token, user: sessionUser });
  await newSession.save();
  res.send(googleUser);
});

// TODO: Should replace this with cookies once https is set up.
app.get('/authenticate', authenticate, (req, res) => {
  res.send(req.session.user);
});

/**
 * remove a session from the database and return the session ended to confirm with the sender
 */
app.get('/logout', authenticate, async (req, res) => {
  try {
    await Session.deleteMany({ token: req.session.token });

    res.send({ session: req.session.token });
  } catch (ex) {
    AuthLogger.error(`Error ending session ${req.session.token}: ${ex}`);
    res.status(500).send(`Error ending session: ${ex}`);
  }
});

/**
 * lists all people with access to the blog
 */
app.get('/users', authenticate, async (req, res) => {
  let users = await User.find({}).catch((ex) => {
    res.status(500).send(ex);
  });

  res.send(users);
});

/**
 * Right now this just changes a pending request to Viewer
 */
app.put('/user/', authenticate, async (req, res) => {
  // TODO: handle bad Ids
  let user = await User.findById(req.body._id).catch((ex) => {
    res.status(500).send(ex);
  });
  if (user.role !== 'Pending') {
    UserLogger.info(
      `Non-Pending user whitelist attempt with ID ${req.body._id}. \nUser: ${
        user.firstName
      } ${user.lastName}\nRole: ${user.role}\nSender: ${req.session.email}`
    );
  } else {
    user.role = req.body.role;
    user.save().catch((ex) => res.status(500).send(ex));
    UserLogger.info(
      `User ${user.firstName} ${user.lastName} granted viewer permissions`
    );
  }

  res.send(user);
});

/**
 * Remove a user
 */
app.delete('/user/:_id', authenticate, async (req, res) => {
  const userId = req.params._id;
  let users = await User.findByIdAndRemove(userId).catch((ex) => {
    res.status(500).send(ex);
  });
  res.send(users);
});

app.delete('/sessions/all', authenticate, async (req, res) => {
  DebugLogger.debug(req.session);
  if (!req.session.token) {
    res.status(401).send(`Session could not be verified`);
  }
  let usersDeleted = await Session.deleteMany({
    token: { $ne: req.session.token },
  }).catch((ex) => {
    res.status(500).send(ex);
  });
  res.send(usersDeleted);
});

app.listen(3030, () => {
  AuthLogger.info(`http://localhost:3030 listening for Requests`);
});
