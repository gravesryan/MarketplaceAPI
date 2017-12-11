var express = require('express');
var router = express.Router();
var user_dal = require('../model/user_dal');

/* GET users listing. */

//View user by email
router.get('/', function(req, res) {
    if(req.query.email == null) {
        res.send('email is null');
    }
    else {
        user_dal.getByEmail(req.query.email, req.query.apikey,
            function(err, result) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json({'result': result[0]});
                }
            });
    }
});
// http://localhost:3000/users/?email=new@email.com&password=password&apikey=2747808961751484

router.get('/verify', function(req, res) {
    if(req.query.email == null) {
        res.send('email is null');
    }
    if(req.query.password == null) {
        res.send('pass is null');
    }
    if(req.query.apikey == null) {
        res.send('apikey is null');
    } else {
        user_dal.verifyAccount(req.query.email, req.query.password, req.query.apikey,
            function(err, result) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json({'result': result});
                }
            });
    }
})

router.get('/all', function(req, res) {
    user_dal.getAll(req.query.apikey,
        function(err, result) {
            if (err) {
                res.send(err);
            }
            else {
                res.json({'result': result[0]});
            }
        });
});
// http://localhost:3000/users/all?apikey=2747808961751484

router.get('/update', function(req, res) {
    console.log(req.query.email);
    if (req.query.email == null) {
        res.send('missing email');
    }
    if (req.query.first_name == null) {
        res.send('missing first name');
    }
    if (req.query.last_name == null) {
        res.send('missing last name');
    }
    if (req.query.payment == null) {
        res.send('missing payment');
    }
    if (req.query.picture == null) {
        res.send('missing picture');
    }
    if (req.query.street == null) {
        res.send('missing street');
    }
    if (req.query.city == null) {
        res.send('missing city');
    }
    if (req.query.zip == null) {
        res.send('missing zip');
    }
    if (req.query._state == null) {
        res.send('missing state');
    }
    if (req.query.day == null) {
        res.send('missing day');
    }
    if (req.query.month == null) {
        res.send('missing month');
    }
    if (req.query.year == null) {
        res.send('missing year');
    }
    if (req.query.apikey == null) {
        res.send('missing apikey');
    }
    else {
        user_dal.update(req.query,
            function(err, result) {
                if (err) {
                    console.log(result);
                    res.send(err);
                }
                else {
                    console.log(result);
                    res.redirect(302, '/users/all');
                }
            })
    }
});

router.get('/insert', function(req, res) {
    console.log(req.query.email);
    if (req.query.email == null) {
        res.send('missing email');
    }
    if (req.query.pass == null) {
        res.send('missing password');
    }
    if (req.query.first_name == null) {
        res.send('missing first name');
    }
    if (req.query.last_name == null) {
        res.send('missing last name');
    }
    if (req.query.payment == null) {
        res.send('missing payment');
    }
    if (req.query.picture == null) {
        res.send('missing picture');
    }
    if (req.query.street == null) {
        res.send('missing street');
    }
    if (req.query.city == null) {
        res.send('missing city');
    }
    if (req.query.zip == null) {
        res.send('missing zip');
    }
    if (req.query._state == null) {
        res.send('missing state');
    }
    if (req.query.day == null) {
        res.send('missing day');
    }
    if (req.query.month == null) {
        res.send('missing month');
    }
    if (req.query.year == null) {
        res.send('missing year');
    }
    if (req.query.apikey == null) {
        res.send('missing apikey');
    }
    else {
        user_dal.insert(req.query,
        function(err, result) {
            if (err) {
                console.log(result);
                res.send(err);
            }
            else {
                console.log(result);
                res.redirect(302, '/users/all');
            }
        })
    }
});

router.get('/delete', function(req, res) {
    if (req.query.email == null) {
        res.send('missing email');
    }
    if (req.query.pass == null) {
        res.send('missing password');
    }
    if (req.query.apikey == null) {
        res.send('missing apikey');
    }
    else {
        user_dal.delete(req.query.email, req.query.pass, req.query.apikey,
        function(err, result) {
            if (err) {
                res.send(err);
            }
            else {
                res.redirect(302, '/users/all');
            }
        })
    }
})


module.exports = router;
