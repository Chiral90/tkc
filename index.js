require('dotenv').config();
const express = require('express');
const session = require('express-session');

const app = express()
const port = process.env.PORT;
const bodyParser = require("body-parser");

const sessionObj = require('./obj/sessionObj')
const champRouter = require('./routes/champ')

app.use(session(sessionObj))
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    console.log(req.session)
    res.json({
        success: true,
    });
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${process.env.PORT}`);
});

app.use('/champ', champRouter);