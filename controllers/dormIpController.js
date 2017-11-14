var express = require('express');
var router = express.Router();

router.get('/:house/:room', function(req, res){
    house = req.params.house;
    room = req.params.room;
    res.send(house + room);
});

module.exports = router;