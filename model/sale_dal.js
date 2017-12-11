var mysql = require('mysql');
var db = require('./db_connection');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'select * from sale';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getByItemId = function(item_id, callback) {
    var query = 'select * from sale where item_id = ?';
    var queryData = [item_id];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};

exports.getByBuyer = function (buyer_email, callback) {
    var query = 'select * from sale where buyer_email = ?';
    var queryData = [buyer_email];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};

exports.getBySaleNum = function (sale_num, callback) {
    var query = 'select * from sale where sale_num = ?';
    var queryData = [sale_num];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'insert into sale(item_id, buyer_email, sale_num) values (?, ?, ?)';
    var queryData = [params.item_id, params.buyer_email, params.sale_num];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};

exports.delete = function(sale_num, callback) {
    var query = 'delete from sale where sale_num = ?';
    var queryData = [sale_num];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};