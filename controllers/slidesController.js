var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    if(req.auth(['admin'])){
        res.render('../views/slides/slides');
    }
});
router.get('/:id', function(req, res){
    var id = req.params.id;
    res.send('get slides by id ' + id);
});


module.exports = router;