var method = dataBaseModule.prototype;

var fs = require('fs');
var mysql = require("mysql");
var bcrypt = require('bcryptjs');

var connection = null;

function dataBaseModule() {
  this.dat = "test";
  connection = mysql.createConnection({
    host: "",
    user: "shane",
    password: "devPassword",
    database: "MY_RENTAL",
  });

  connection.connect(function (err) {
    if (err) {
      console.log('Error Connecting to MYSQL');
      return;
    }
    console.log("Connection Established With MYSQL");
  });

};

method.registerUser = (request, callBack) => {
    var password = hashPassword(request.body.password);
    var email = request.body.email;
    var username = request.body.username;

    var checkUserSql = "SELECT * FROM USERS WHERE NAME = '" + username + "' OR EMAIL = '" + email + "'";
    console.log(checkUserSql);
    connection.query(checkUserSql, (err, rows) => {
        if(rows.length == 0) {
            var submitUserSql = "INSERT INTO USERS VALUES('" + username + "','" + password + "', NULL, '" + email  + "')";
            console.log(submitUserSql);
            connection.query(submitUserSql, (err, rows) => {
                return callBack ({
                    success: true,
                });
            });
        } else {
            return callBack ({
                success: false,
            });
        }
    });
}

function hashPassword(password) {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

module.exports = dataBaseModule;
