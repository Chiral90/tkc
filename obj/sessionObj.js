require('dotenv').config();
const session = require('express-session');
const fileStore = require('session-file-store')(session);
const champion = require('./champion');
const maxAge = 1000 * 6 * 5;

const sessionObj = {
    champ: new champion(),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge,
    },
    store: new fileStore()
};

module.exports = sessionObj;