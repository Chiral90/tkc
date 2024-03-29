const express = require('express');
const session = require('express-session')
const router = express.Router();

const champion = require('../obj/champion');

router.get('/', (req, res) => {
    //
    res.json({
        name: "test",
        type: "test type"
    })
});

router.post('/create', (req, res) => {
    let name = req.body.name
    let type = req.body.type
    
    let champ = new champ()
    champ.name = name
    champ.type = type
    res.json(champ)
});

router.put('/', (req, res) => {

});

module.exports = router;