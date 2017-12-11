var mysql = require('mysql');
var db = require('./db_connection');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'select * from pictures';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

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