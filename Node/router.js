var express = require("express");
var router = express.Router();

router.use(function(req, res, next) {
    console.log("/" + req.method);
    next();
});


router.get("/", function(req, res) {
    console.log("hello server");
});
