var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABBASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getByEmail = function(email, apikey, callback) {
    var query = 'call get_user_info(?, ?)';
    var queryData = [email, apikey];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.verifyAccount = function(email, password, apikey, callback) {
    var query = 'select verify_account(?, ?, ?) as verified';
    var queryData = [email, password, apikey];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    })
}

exports.getAll = function(apikey, callback) {
    //var query = 'select * from user';
    var query = 'call get_all_users(?)';
    var queryData = [apikey];

    connection.query(query, queryData, function(err, result) {
        if (err) {
            callback(true);
            return;
        }
        callback(false, result);
    });
};

exports.update = function(data, callback) {
    var query = 'call update_user(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    var queryData = [data.email, data.first_name, data.last_name,
        data.payment, data.picture, data.street, data.city, data._state,
        data.zip, data.day, data.month, data.year,
        data.apikey];

    connection.query(query, queryData, function(err, result) {
        console.log(err);
        callback(err, result);
    });
};

exports.insert = function(data, callback) {
    var query = 'call new_user(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    var queryData = [data.email, data.pass, data.first_name, data.last_name,
        data.payment, data.picture, data.street, data.city,
        data.zip, data._state, data.day, data.month, data.year,
        data.apikey];

    connection.query(query, queryData, function(err, result) {
        console.log(err);
        callback(err, result);
    });
};

exports.delete = function(email, password, apikey, callback) {
    var query = 'call delete_user(?, ?, ?)';
    var queryData = [email, password, apikey];

    connection.query(query, queryData, function(err, result) {
        console.log(err);
        callback(err, result);
    });
}

/* http://localhost:3306/users/insert/?email=fromurl@email.com&pass=password&first_name=test&last_name=test&payment=none&picture=none&street=street&city=city&zip=zip&_state=state&day=01&month=01&year=0101&apikey=2747808961751484 */

/* http://localhost:3306/users/all?apikey=2747808961751484 */

/* http://localhost:3306/users/?email=new2@email.com&password=password&apikey=2747808961751484 */