const express = require('express');
const session = require('express-session');
const router = express.Router();
const building = require('../obj/building');
const champion = require('../obj/champion');
const pool = require('../middleware/dbConfig');
const { getChampionInfo, createChampionInfo, createStationedInfo, changeTeam, updateDestination, updateLocation } = require('../functions/champ');
const { getBuildingInfo, createBuildingInfo, updateBuildingTeam } = require('../functions/building');

router.use(express.json({ extended: true }));
router.get('/', async (req, res) => {
    //
    console.log('enter champ root...');
    try {
        const id = req.cookies.id;
        console.log(id);
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

router.post('/create', async (req, res) => {
    try {
        const { champ_name, champ_type, leadership, team } = req.body;
        const id = req.cookies.id;
        const champ = new champion(id, champ_name, champ_type, leadership, team);
        console.log('id: ', id, ' champion: ', champ);
        const result = await createChampionInfo(champ);
        const result2 = await createStationedInfo(champ);
        console.log("created new user... / ", result, " / ", result2);
        res.status(200).send("created new user...");
        // res.status(200).send();
    } catch (err) {
        console.log(err.data);
        res.status(404).send("create new user fail...");
    }
});

router.post('/changeTeam/:team', async (req, res) => {
    try {
        const nextTeam = req.params.team;
        const name = req.body.champ_name;
        const team = req.body.team;
        const result = await changeTeam(req.body, nextTeam);
        res.status(200).send(`${champ.champ_name} change team ${champ.team} -> ${team}`);
    } catch (err) {
        console.error(err.data);
        res.status(404).send("change team failed...");
    }
});

router.post('/updateDestination/:destination', async (req, res) => {
    try {
        const _champName = req.body.champ_name;
        const _destination = req.params.destination;
        console.log(`${_champName} / ${_destination}`);
        const result = await updateDestination(_champName, _destination);
        console.log(result);
        res.status(200).send(`${_champName} change destination to ${_destination}`);
    } catch (err) {
        console.error(err.data);
        res.status(404).send("change destination failed...");
    }
});
router.post('/updateLocation/:location', async (req, res) => {
    try {
        const _champName = req.body.champ_name;
        const _location = req.params.location;
        console.log(`${_champName} / ${_location}`);
        const result = await updateLocation(_champName, _location);
        const buildingInfo = await getBuildingInfo(new building(_location));
        if (buildingInfo.team == 0) {
            const updateResult = await updateBuildingTeam(_location, req.body.team);
            console.log(updateResult);
        }
        console.log(result);
        res.status(200).send(`${_champName} change location to ${_location}`);
    } catch (err) {
        console.error(err.data);
        res.status(404).send("change location failed...");
    }
});

module.exports = router;