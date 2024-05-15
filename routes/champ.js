const express = require('express');
const session = require('express-session')
const router = express.Router();
const champion = require('../obj/champion');
const pool = require('../middleware/dbConfig');
const { getChampionInfo, createChampionInfo } = require('../functions/champ');

router.get('/', async (req, res) => {
    //
    console.log('enter champ root...');
    try {
        const id = String(req.cookies.id);
        const data = await getChampionInfo(id);
        const champ = data[0];
        console.log(`id: ${id}, "champ_name": "${champ.champ_name}"`);
        if (champ.champ_name == '') {
            console.error('champ_name is undefined');
            throw 'Not Existing ID';
        }
        else {
            res.json({
                champ_name: champ.champ_name,
                champ_type: champ.champ_type,
                leadership: champ.leadership,
                team: champ.team,
                own_castles: champ.own_castles,
                location: champ.location
            });
        }
    } catch (err) {
        console.log('name : ', err.name, ' type : ', typeof(err), ' data : ', err.data);
        res.status(400).send("Not existing id");
    }
});
router.get('/champs/:champs', (req, res) => {
    //
    const champs = req.params.champs;
    console.log(champs);
    const query = String(champs).split(',');
    const id = String(req.cookies.id)
    var result = "{";
    query.forEach(element => {
        console.log(element);
    });
    console.log('enter champs root...');
    try {
        query.forEach(element => {
            //search by champ_name
            console.log(element);
            //require champ data
            console.log('../data/user/' + id + '.json');
            const champ = require('../data/user/' + id + '.json');
            //add champ data
        });
        //console.log(window.location.host);
        res.json({
            champ_name: champ.champ_name,
            champ_type: champ.champ_type,
            leadership: champ.leadership,
            team: champ.team,
            own_castles: champ.own_castles,
            location: champ.location
        });
    } catch (err) {
        console.log('name : ', err.name, ' type : ', typeof(err), ' data : ', err.data);
        res.status(400).send("Not existing id");
    }
});

router.post('/create', async (req, res) => {
    console.log('create');
    const name = req.body.champ_name;
    const type = req.body.champ_type;
    const leadership = req.body.leadership;
    const team = req.body.team;
    const id = req.cookies.id;
    const champ = new champion(id, name, type, leadership, team);
    console.log('id: ', id, ' champ: ', champ);
    const result = await createChampionInfo(champ);
    console.log("created new user... / ", result);
    res.status(201).send("created new user...");
});

router.put('/', (req, res) => {

});

module.exports = router;