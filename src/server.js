const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const json = express.json;
const morgan = require('morgan');
const session = require('express-session');
const { sessionSecret } = require('./config/secrets');
const sessionStore = require('connect-session-knex')(session);

require('dotenv').config();

const apiRoutes = require('./routes');

const server = express();

const sessionOptions = {
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60
  },
  name: 'on-the-edge-of-destiny-stands-a-titan-at-war-with-himself',
  resave: false,
  saveUninitialized: false,
  secret: sessionSecret,
  store: new sessionStore({
    createtable: true,
    knex: require('./database'),
    sidfieldname: 'session_id',
    tablename: 'sessions'
  })
};

server.use(cors());
server.use(helmet());
server.use(json());
server.use(morgan('dev'));
server.use(session(sessionOptions));

server.get('/', (req, res) => res.json({
  date: Date.now(),
  message: 'Unauthorized use of this service will result in immediate termination.',
  success: true
}));

server.use('/api', apiRoutes);

module.exports = server;