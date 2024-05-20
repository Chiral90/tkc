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

//const sessionObj = require('./obj/sessionObj');
const champRouter = require('./routes/champ');
const buildingRouter = require('./routes/building');
const { getRound, createTurn, resetTurn } = require('./functions/turnInfo');
const { getChampionInfo } = require('./functions/champ');

//app.use(cors({
//    origin: true,
//    credental: true,
//}));
app.set('view engine', 'html');
nunjucks.configure('view', {
    express: app,
    watch: true,
});
app.use(cookieParser(process.env.COOKIE_SECRET))
//app.use(session(sessionObj))
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    console.log('get / ');
    res.json({Turn: 0, ServerTime: new Date(Date.now())});
});
app.get('/sql', async (req, res) => {
    // var queryResult = await tmp();
    res.json({Turn: 0, ServerTime: new Date(Date.now())});
});
app.get('/root', (req, res) => {
    //존재하는 id이면 진행
    try {
        const id = req.cookies.id;
        const token = generateToken(id);
        const user = getChampionInfo(id);
        res.cookie('token', token);
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
app.get('/getRound', async (req, res) => {
    console.log('get Round...');
    var queryResult = await getRound();
    var round = queryResult.round;
    var turn = queryResult.turn;
    var startTime = queryResult.start_time;
    console.log('current round : ', round, ' / turn : ', turn, ' / start time : ', new Date(startTime).toISOString().slice(0, 19).replace('T', ' '));
    res.json({
        currentRound: round,
        currentTurn: turn,
        startTime: new Date(startTime).toISOString().slice(0, 19).replace('T', ' ')
    })
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


var currentRound = 0;
var currentTurn = 0;
var currentTurnStartTime;
var isRoundFinished = false;
// get round, turn from db if exist
const startRound = function() {
    console.log('start round : ', currentRound, ' turn : ', currentTurn);
    startTurn = setInterval(async function() {
        // currentTurnStartTime = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');;
        currentTurnStartTime = new Date(Date.now());
        console.log('turn : ', currentTurn, ' / turn start time : ', currentTurnStartTime);
        var result = await createTurn(currentRound, currentTurn);
        currentTurn += 1;
        console.log(result);
        //finish round condition
        if (currentTurn == 3)
        {
            stopRound();
        }
    }, 1000 * 60 * 5);
};

// startTurn = setInterval(function() {
//     console.log('next turn...');
// }, 3000);

const stopRound = async function() {
    console.log('end round : ', currentRound, ' turn : ', currentTurn);
    var result = await resetTurn(currentRound);
    console.log(result);
    clearInterval(startTurn);
    currentTurn = 0;
    currentRound += 1;
    startRound();
};

// control turn
// try {
//     startRound();
// } catch (err) {
//     console.error(err);
// }