var express = require('express');
var router = express.Router();
var auth = require('../middlewares/authMiddleware');

router.get('/', function(req, res){
    res.render('../views/slides/slides_markdown', {theme:'white', slides:['p test1', 'p test2']});
});
router.get('/:id', function(req, res){
    var id = req.params.id;
    res.send('get slides by id ' + id);
});


module.exports = router;