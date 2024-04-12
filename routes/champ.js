const express = require('express');
const session = require('express-session')
const { writeFileSync, readFile } = require('fs');
const router = express.Router();

const champion = require('../obj/champion');

router.get('/', (req, res) => {
    //
    console.log('enter champ root...');
    const id = req.cookies.id;
    const champ = require('../data/users.json')[id];
    res.json({
        pwd: '/champ',
        champ_name: champ.champ_name,
        champ_type: champ.champ_type
    })
});

router.post('/create', (req, res) => {
    try {
        const name = req.body.champ_name;
        const type = req.body.champ_type;
        const data = `{ "champ_name": "${name}","champ_type":${type} }`;
        const users = require('../data/users.json')
        const id = req.cookies.id;
        console.log('id:', id, 'name:', name, ' / type: ', type)
        const parseData = JSON.parse(data);
        users[id] = parseData;
        console.log("created new user...");
        writeFileSync('./data/users.json', JSON.stringify(users));
    } catch (err) {
        console.log(err);
    } finally {
        res.redirect('/');
    }
});

router.put('/', (req, res) => {

});

module.exports = router;