require('dotenv').config();
const express = require('express');
//const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const nunjucks = require('nunjucks');

const { generateToken, verifyToken } = require('./middleware/v1Auth')
const app = express()
const port = process.env.PORT;
const bodyParser = require("body-parser");

const sessionObj = require('./obj/sessionObj')
const champRouter = require('./routes/champ')

//app.use(cors({
//    origin: true,
//    credental: true,
//}));
app.set('view engine', 'html');
nunjucks.configure('view', {
    express: app,
    watch: true,
})
app.use(cookieParser(process.env.COOKIE_SECRET))
//app.use(session(sessionObj))
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    //존재하는 id이면 진행
    const users = require('./data/users.json')
    const id = req.cookies.id;
    const token = generateToken(id)
    res.cookie('token', token)
    if (users.hasOwnProperty(id)) {
        console.log("existing user...");
        res.render('champ', {
            isExisting: true,
            champ_name: users[id].champ_name,
            champ_type: users[id].champ_type
        });
    }
    //존재하는 id => 토큰 확인
    else if (!users.hasOwnProperty(id)) {
        console.log("new user...")
        res.render('champ', {
            isExisting: false,
            champ_name: '',
            champ_type: 0
        });
    }
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${process.env.PORT}`);
});
app.use('/champ', (req, res, next) => verifyToken(req, res, next), champRouter);