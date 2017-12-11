var express = require('express');
var router = express.Router();
var sale_dal = require('../model/sale_dal');

router.get('/', function(req, res) {
    if (req.query.sale_num == null) {
        res.send('sale_num is null');
    } else {
        sale_dal.getBySaleNum(req.query.sale_num, function(err, result) {
            if (err) {
                res.send(err);
            }  else {
                res.json({'result': result});
            }
        });
    }
});

router.get('/all', function(req, res) {
    sale_dal.getAll(
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
        sale_dal.getByItemId(req.query.item_id, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json({'result': result});
            }
        });
    }
});

router.get('/buyer', function(req, res) {
    if (req.query.buyer_email == null) {
        return ('buyer_email is null');
    } else {
        sale_dal.getByBuyer(req.query.buyer_email, function(err, result) {
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
    if (req.query.buyer_email == null) {
        res.send('missing email');
    }
    if (req.query.sale_num == null) {
        res.send('missing sale number');
    }
    else {
        sale_dal.insert(req.query,
            function(err, result) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.redirect(302, '/sale/all');
                }
            })
    }
});

router.get('/delete', function(req, res) {
    if (req.query.sale_num == null) {
        res.send('missing sale_num');
    }
    else {
        sale_dal.delete(req.query.sale_num,
            function(err, result) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.redirect(302, '/sale/all');
                }
            })
    }
});

module.exports = router;