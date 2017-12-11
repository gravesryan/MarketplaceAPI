var express = require('express');
var router = express.Router();
var inbox_dal = require('../model/inbox_dal');

router.get('/', function(req, res) {
    if (req.query.msg_id == null) {
        res.send('email is null');
    } else {
        inbox_dal.getById(req.query.msg_id, function(err, result) {
          if (err) {
              res.send(err);
          }  else {
              res.json({'result': result});
          }
        });
    }
});

router.get('/all', function(req, res) {
    inbox_dal.getAll(
        function(err, result) {
            if (err) {
                res.send(err);
            }
            else {
                res.json({'result': result});
            }
        });
});

router.get('/sentby', function(req, res) {
    if (req.query.sender_email == null) {
        return ('email is null');
    } else {
        inbox_dal.getBySender(req.query.sender_email, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json({'result': result});
            }
        });
    }
});

router.get('/sentto', function(req, res) {
    if (req.query.recipient_email == null) {
        return ('email is null');
    } else {
        inbox_dal.getByRecipient(req.query.recipient_email, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json({'result': result});
            }
        });
    }
});

router.get('/insert', function(req, res) {
    if (req.query.recipient_email == null) {
        res.send('missing recipient email');
    }
    if (req.query.sender_email == null) {
        res.send('missing sender email');
    }
    if (req.query.message == null) {
        res.send('missing message');
    }
    if (req.query.item_id == null) {
        res.send('missing item_id');
    }
    if (req.query.subject == null) {
        res.send('missing subject');
    }
    else {
        inbox_dal.insert(req.query,
            function(err, result) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.redirect(302, '/inbox/all');
                }
            })
    }
});

router.get('/delete', function(req, res) {
    if (req.query.msg_id == null) {
        res.send('missing password');
    }
    else {
        inbox_dal.delete(req.query.msg_id,
            function(err, result) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.redirect(302, '/inbox/all');
                }
            })
    }
});

module.exports = router;