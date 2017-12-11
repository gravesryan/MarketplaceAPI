/**
 * Created by charlie on 11/27/17.
 */
var express = require('express');
var router = express.Router();
var item_dal = require('../model/item_dal');

router.get('/', function(req, res) {
    if(req.query.item_id == null) {
        res.send('item_id is null');
    }
    else {
        item_dal.getById(req.query.item_id,
            function(err, result) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json({'result': result});
                }
            });
    }
});

router.get('/all', function(req, res) {
    item_dal.getAll(function(err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.json({'result': result});
        }
    });
});

router.get('/seller', function(req, res) {
    if (req.query.seller_email == null) {
        res.send('email is null')
    }
    item_dal.getBySeller(req.query.seller_email, function(err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.json({'result': result});
        }
    });
});

router.get('/category', function(req, res) {
    if (req.query.category == null) {
        res.send('category is null')
    }
    item_dal.getByCategory(req.query.category, function(err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.json({'result': result});
        }
    });
});

router.get('/maxprice', function(req, res) {
    if (req.query.price == null) {
        res.send('price is null')
    }
    item_dal.getByMaxPrice(req.query.price, function(err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.json({'result': result});
        }
    });
});

router.get('/minage', function(req, res) {
    if (req.query.minage == null) {
        res.send('minage is null')
    }
    item_dal.getByMinAge(req.query.minage, function(err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.json({'result': result});
        }
    });
});

router.get('/insert', function(req, res) {
    if (req.query.email == null) {
        res.send('missing email');
    }
    if (req.query.name == null) {
        res.send('missing name');
    }
    if (req.query.description == null) {
        res.send('missing description');
    }
    if (req.query.category == null) {
        res.send('missing category');
    }
    if (req.query.quantity == null) {
        res.send('missing quantity');
    }
    if (req.query.price == null) {
        res.send('missing price');
    }
    if (req.query.minage == null) {
        res.send('missing minage');
    }
    else {
        item_dal.insert(req.query,
            function(err, result) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.redirect(302, '/item/all');
                }
            })
    }
});

router.get('/delete', function(req, res) {
    if (req.query.item_id == null) {
        res.send('missing item_id');
    }
    else {
        item_dal.delete(req.query.item_id,
            function(err, result) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.redirect(302, '/item/all');
                }
            })
    }
});

module.exports = router;