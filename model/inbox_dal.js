/**
 * Created by ryan on 12/4/17.
 */
var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABBASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'select * from inbox';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getByRecipient = function(recipient_email, callback) {
    var query = 'select * from inbox where recipient_email = ?';
    var queryData = [recipient_email];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.getBySender = function(sender_email, callback) {
    var query = 'select * from inbox where sender_email = ?';
    var queryData = [sender_email];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(msg_id, callback) {
    var query = 'select * from inbox where msg_id = ?';
    var queryData = [msg_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'insert into inbox(recipient_email, sender_email, message, subject) values(?, ?, ?, ?);';
    var queryData = [params.recipient_email, params.sender_email, params.message, params.subject];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.delete = function(msg_id, callback) {
    var query = 'delete from inbox where msg_id = ?';
    var queryData = [msg_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};