const express = require('express');
const session = require('express-session')
const { writeFileSync, readFile } = require('fs');
const router = express.Router();

const champion = require('../obj/champion');

router.get('/', (req, res) => {
    //
    console.log('enter champ root...');
    try {
        //console.log(window.location.host);
        const id = String(req.cookies.id)
        console.log('../data/user/' + id + '.json');
        const champ = require('../data/user/' + id + '.json');
        console.log(`id: ${id}, "champ_name": "${champ.champ_name}"`);
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

router.post('/create', (req, res) => {
    try {
        const name = req.body.champ_name;
        const type = req.body.champ_type;
        const leadership = req.body.leadership;
        const team = req.body.team;
        const owncasltes = req.body.own_castles;
        const data = `{ "champ_name": "${name}","champ_type":${type},"leadership":${leadership},"team":${team},"own_castles":${owncasltes},"location":"" }`;
        const id = req.cookies.id;
        console.log('id: ', id, ' data: ', data);
        const parseData = JSON.parse(data);
        console.log("created new user...");
        writeFileSync('./data/user/' + id + '.json', JSON.stringify(parseData));
        res.status(201).send("created new user...");
    } catch (err) {
        console.log(err.data);
        res.status(404).send("create new user fail...");
    } finally {
        res.redirect('/');
    }
});

router.put('/', (req, res) => {

});

module.exports = router;