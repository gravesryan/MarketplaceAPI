var mysql = require('mysql');
var db = require('./db_connection');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'select * from tags';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getByItemId = function(item_id, callback) {
    var query = 'select * from tags where item_id = ?';
    var queryData = [item_id];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};

exports.getByTag = function (tag, callback) {
    var query = 'select * from tags where tag = ?';
    var queryData = [tag];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'insert into tags(item_id, tag) values (?, ?)';
    var queryData = [params.item_id, params.tag];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};

exports.delete = function(params, callback) {
    var query = 'delete from tags where item_id = ? and tag = ?';
    var queryData = [params.item_id, params.tag];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};