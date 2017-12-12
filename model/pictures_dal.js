var mysql = require('mysql');
var db = require('./db_connection');
var multer = require('multer');

var connection = mysql.createConnection(db.config);

var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./public/images");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage: Storage
}).array("imgUploader", 3);

exports.getAll = function(callback) {
    var query = 'select * from pictures';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.upload = function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        return res.end("File uploaded successfully!");
    });
}

exports.getByItemId = function(item_id, callback) {
    var query = 'select * from pictures where item_id = ?';
    var queryData = [item_id];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};

exports.getById = function (img_id, callback) {
    var query = 'select * from pictures where img_id = ?';
    var queryData = [img_id];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'insert into pictures(item_id, img_data) values (?, ?)';
    var queryData = [params.item_id, params.img_data];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};

exports.delete = function(img_id, callback) {
    var query = 'delete from pictures where img_id = ?';
    var queryData = [img_id];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};

exports.deleteAllForItem = function(item_id, callback) {
    var query = 'delete from pictures where item_id = ?';
    var queryData = [item_id];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};