const express = require('express');
const session = require('express-session');
const pool = require('../middleware/dbConfig');
const router = express.Router();

const building = require('../obj/building');
const champion = require('../obj/champion');
const { getBuildingInfo, createBuildingInfo } = require('../functions/building');

router.use(express.json({ extended: true }));
router.get('/:name', async (req, res) => {
    //
    console.log('enter building root...');
    try {
        //console.log(window.location.host);
        const name = String(req.params.name);
        console.log('building: ' + name);
        const b = new building(name);
        const buildingData = await getBuildingInfo(b);
        console.log(`${buildingData.building_name} : data: "${JSON.stringify(buildingData)}"`);
        // res.json({
        //     building_name: buildingData.building_name,
        //     castellan: buildingData.castellan,
        //     building_type: buildingData.building_type,
        //     population: buildingData.population,
        //     food: buildingData.food,
        //     morale: buildingData.morale,
        //     stationed: buildingData.stationed
        // });
        res.send(JSON.stringify(buildingData));
    } catch (err) {
        console.log('name : ', err.name, ' type : ', typeof(err), ' data : ', err.data);
    }
});

router.post('/create', async (req, res) => {
    try {
        // const { building_name, building_type, castellan, food, population, morale } = req.body;
        const id = req.cookies.id;
        // const buildingObj = new building(id, champ_name, champ_type, leadership, team);
        console.log('id: ', id, ' champion: ', req.body);
        const result = await createBuildingInfo(req.body);
        console.log("created new building... / ", result);
        res.status(201).send("created new building...");
    } catch (err) {
        console.error(err);
        res.status(404).send("create new building fail...");
    }
});

module.exports = router;