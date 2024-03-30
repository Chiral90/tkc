require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');

const { verifyToken } = require('./middleware/v1Auth')
const app = express()
const port = process.env.PORT;
const bodyParser = require("body-parser");

const sessionObj = require('./obj/sessionObj')
const champRouter = require('./routes/champ')

app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session(sessionObj))
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', verifyToken, (req, res) => {
    console.log('req.session.champ', req.session.champ);
    console.log('Cookie: ', req.cookies);
    console.log('Signed Cookie: ', req.signedCookies);
    res.json({
        success: true,
    });
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${process.env.PORT}`);
});

app.use('/champ', champRouter);