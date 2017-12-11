var express = require('express');
var router = express.Router();
var tags_dal = require('../model/tags_dal');

router.get('/', function(req, res) {
    if (req.query.tag == null) {
        res.send('tag is null');
    } else {
        tags_dal.getByTag(req.query.tag, function(err, result) {
            if (err) {
                res.send(err);
            }  else {
                res.json({'result': result});
            }
        });
    }
});

router.get('/all', function(req, res) {
    tags_dal.getAll(
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
        tags_dal.getByItemId(req.query.item_id, function(err, result) {
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
    if (req.query.tag == null) {
        res.send('missing tag');
    }
    else {
        tags_dal.insert(req.query,
            function(err, result) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.redirect(302, '/tags/all');
                }
            })
    }
});

router.get('/delete', function(req, res) {
    if (req.query.item_id == null) {
        res.send('missing item_id');
    }
    if (req.query.tag == null) {
        res.send('missing tag');
    }
    else {
        tags_dal.delete(req.query,
            function(err, result) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.redirect(302, '/tags/all');
                }
            })
    }
});

module.exports = router;