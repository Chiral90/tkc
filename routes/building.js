const express = require('express');
const session = require('express-session')
const { writeFileSync, readFile } = require('fs');
const router = express.Router();

const building = require('../obj/building');

router.get('/:name', (req, res) => {
    //
    console.log('enter building root...');
    try {
        //console.log(window.location.host);
        const name = String(req.params.name);
        console.log('building: ' + name);
        const buildingData = require('../data/building/' + name + '.json');
        console.log(`${name} : data: "${JSON.stringify(buildingData)}"`);
        res.json({
            building_name: buildingData.buildingName,
            castellan: buildingData.castellan,
            team: buildingData.team,
            building_type: buildingData.buildingType,
            population: buildingData.population,
            food: buildingData.food,
            morale: buildingData.morale,
            stationed: buildingData.stationed
        });
    } catch (err) {
        console.log('name : ', err.name, ' type : ', typeof(err), ' data : ', err.data);
    }
});

router.post('/create', (req, res) => {
    try {
        const name = req.body.building_name;
        const type = req.body.building_type;
        const castellan = req.body.castellan;
        const stationed = req.body.stationed;
        const food = req.body.food;
        const population = req.body.population;
        const morale = req.body.morale;
        const data = `{ "building_name": "${name}","building_type":${type},"population":${population},"food":${food},"morale":${morale} }`;
        const id = req.cookies.id;
        if (id == "admin") {
            console.log('id: ', id, ' data: ', data);
            const parseData = JSON.parse(data);
            console.log("created new building...");
            writeFileSync('./data/building/' + id + '.json', JSON.stringify(parseData));
        }
    } catch (err) {
        console.log(err.data);
    }
});

router.put('/building/:name', (req, res) => {
    try {
        const name = req.body.building_name;
        const type = req.body.building_type;
        const castellan = req.body.castellan;
        const stationed = req.body.stationed;
        const food = req.body.food;
        const population = req.body.population;
        const morale = req.body.morale;
        const data = `{ "building_name": "${name}","building_type":${type},"population":${population},"food":${food},"morale":${morale} }`;
        const id = req.cookies.id;
        if (id == "admin") {
            console.log('id: ', id, ' data: ', data);
            const parseData = JSON.parse(data);
            console.log("created new building...");
            writeFileSync('./data/building/' + id + '.json', JSON.stringify(parseData));
        }
    } catch (err) {
        console.log(err.data);
    }
});

module.exports = router;