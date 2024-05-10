require('dotenv').config();
const express = require('express');
//const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const nunjucks = require('nunjucks');

//const { generateToken, verifyToken } = require('./middleware/v1Auth')
const app = express()
const port = process.env.PORT;
const bodyParser = require("body-parser");

const sessionObj = require('./obj/sessionObj');
const champRouter = require('./routes/champ');
const buildingRouter = require('./routes/building');
const sqlRouter = require('./routes/sqlConnector');

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
    console.log('get / ');
    res.json({Turn: 0, ServerTime: new Date(Date.now())});
})
app.get('/root', (req, res) => {
    //존재하는 id이면 진행
    try {
        const id = req.cookies.id;
        const user = require('./data/' + id + '.json')
        const token = generateToken(id)
        res.cookie('token', token)
        //if (users.hasOwnProperty(id)) {
        if (user != null) {
            console.log("existing user...");
            res.render('champ', {
                isExisting: true,
                champ_name: user.champ_name,
                champ_type: user.champ_type,
                leadership: user.leadership,
                own_castles: user.own_castles
            });
        }
        //존재하는 id => 토큰 확인
        //else if (!users.hasOwnProperty(id)) {
        else {
            console.log("new user...")
            res.render('champ', {
                isExisting: false,
                champ_name: '',
                champ_type: '',
                leadership: 0,
                own_castles: []
            });
        }
    } catch (err) {
        console.log(err);
    }
});
// 다음 턴 병합

// 다음 턴 예정 액션 업로드

app.listen(port, () => {
    console.log(`server is listening at localhost:${process.env.PORT}`);
});
//app.use('/champ', (req, res, next) => verifyToken(req, res, next), champRouter);
app.use('/champ', champRouter);
//app.use('/building', (req, res, next) => verifyToken(req, res, next), buildingRouter);
app.use('/building', buildingRouter);
app.use('/sql', sqlRouter);