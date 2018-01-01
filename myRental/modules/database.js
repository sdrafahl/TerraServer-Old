var method = dataBaseModule.prototype;

var fs = require('fs');
var mysql = require("mysql");
var bcrypt = require('bcryptjs');
var randomstring = require("randomstring");

function dataBaseModule() {
  this.connection = mysql.createConnection({
    host: "",
    user: "shane",
    password: "devPassword",
    database: "MY_RENTAL",
  });

  this.connection.connect(function (err) {
    if (err) {
      console.log('Error Connecting to MYSQL');
      return;
    }
    console.log("Connection Established With MYSQL");
  });
};

method.registerUser = (request, result, callBack) => {
    console.log("Registering User");
    var password = hashPassword(request.body.password);
    var email = request.body.email;
    var username = request.body.username;

    var checkUserSql = "SELECT * FROM USERS WHERE NAME = " + "'" + username + "'" + " OR EMAIL = " + "'" + email + "'";
    console.log(checkUserSql);
    this.connection.query(checkUserSql, (err, rows) => {
        if(err) throw err;

        if(rows.length == 0) {
            var submitUserSql = "INSERT INTO USERS VALUES('" + username + "','" + password + "', NULL, '" + email  + "')";
            console.log(submitUserSql);
            this.connection.query(submitUserSql, (err, rows) => {
                if(err) throws err;
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
