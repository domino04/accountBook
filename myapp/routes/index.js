var express = require("express");
var router = express.Router();

/* GET home page. */

let isAuth = false;

router.get("/", function (req, res, next) {
  console.log("쿠키s아이디", req.cookies.sid);
  if (!req.cookies.sid) {
    res.render("index", { title: "Express" });
  } else {
    isAuth = true;
    res.render("auth_index", { username: "회원님" });
  }
});

module.exports = router;
