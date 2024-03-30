const express = require('express');
const session = require('express-session')
const router = express.Router();

const champion = require('../obj/champion');

router.get('/', (req, res) => {
    //
    var champ = req.session.champ;
    console.log(champ);
    if (!champ) {
        champ = new champion();
    }
    res.json({
        pwd: "/champ",
        name: champ.name,
        type: champ.type,
    })
});

router.post('/create', (req, res) => {
    const name = req.body.name;
    const type = req.body.type;
    console.log('name:', name, ' / type: ', type)
    
    const champ = new champion(name, type);
    console.log(champ)
    req.session.champ = champ;
    res.json(champ);
});

router.put('/', (req, res) => {

});

module.exports = router;