var express = require('express');
var router = express.Router();
var pictures_dal = require('../model/pictures_dal');

router.get('/', function(req, res) {
    if (req.query.img_id == null) {
        res.send('img_id is null');
    } else {
        pictures_dal.getById(req.query.img_id, function(err, result) {
            if (err) {
                res.send(err);
            }  else {
                res.json({'result': result});
            }
        });
    }
});

router.get('/all', function(req, res) {
    pictures_dal.getAll(
        function(err, result) {
            if (err) {
                res.send(err);
            }
            else {
                res.json({'result': result});
            }
        });
});

router.get('/item_id', function(req, res) {
    if (req.query.item_id == null) {
        return ('item_id is null');
    } else {
        pictures_dal.getByItemId(req.query.item_id, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json({'result': result});
            }
        });
    }
});

router.get('/insert', function(req, res) {
    if (req.query.item_id == null) {
        res.send('missing item_id');
    }
    if (req.query.img_data == null) {
        res.send('missing img_data');
    }
    else {
        pictures_dal.insert(req.query,
            function(err, result) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.redirect(302, '/pictures/all');
                }
            })
    }
});

router.get('/delete', function(req, res) {
    if (req.query.img_id == null) {
        res.send('missing item_id');
    }
    else {
        pictures_dal.delete(req.query.img_id,
            function(err, result) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.redirect(302, '/pictures/all');
                }
            })
    }
});

router.get('/deleteItem', function(req, res) {
    if (req.query.item_id == null) {
        res.send('missing item_id');
    }
    else {
        pictures_dal.delete(req.query.item_id,
            function(err, result) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.redirect(302, '/pictures/all');
                }
            })
    }
});

module.exports = router;