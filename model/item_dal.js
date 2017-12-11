/**
 * Created by charlie on 11/27/17.
 */
var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABBASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getById = function(item_id, callback) {
    var query = 'select * from item where item_id = ?';
    var queryData = [item_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.getAll = function(callback) {
    var query = 'select * from item';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getBySeller = function(seller_email, callback) {
    var query = 'select * from item where seller_email = ?';
    var queryData = [seller_email];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.getByCategory = function(category, callback) {
    var query = 'select * from item where category = ?';
    var queryData = [category];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.getByMaxPrice = function(price, callback) {
    var query = 'select * from item where price <= ?';
    var queryData = [price];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.getByMinAge = function(minAge, callback) {
    var query = 'select * from item where minAge = ?';
    var queryData = [minAge];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'call new_item(?, ?, ?, ?, ?, ?, ?)';
    var queryData = [params.email, params.name, params.description,
        params.category, params.quantity, params.price,
        params.minage];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.delete = function(item_id, callback) {
    var query = 'delete from item where item_id = ?';
    var queryData = [item_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};