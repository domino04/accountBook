var express = require("express");
var router = express.Router();

var dbForUsers = [
  {
    dbuserName: null,
    dbpassWord: null,
  },
];

var dbForUserNames = [];

var generateRandom = function (min, max) {
  var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return ranNum;
};

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("register", { title: "register" });
});

// 회원가입 페이지 띄우기
router.get("/", function (req, res, next) {
  res.render("register", { title: "register" });
});

// 아이디 패스워드 저장해주기
router.post("/", function (req, res, next) {
  console.log("바디", req.body);
  const { username, password } = req.body;
  // 이미 존재하는 아이디가 아니라면
  if (!dbForUserNames.includes(username)) {
    //디비에 저장하는걸 해줘야함.
    dbForUsers.push({
      dbuserName: username,
      dbpassWord: password,
    });
    dbForUserNames.push(username);
    res.redirect("/");
  } else {
    res.render("error", { message: "이미 존재하는 아이디입니다." });
  }
});

// 로그인 페이지 띄우기
router.get("/login", function (req, res, next) {
  res.render("login", { title: "login" });
});

var login = false;
// 로그인 하기
router.post("/login", function (req, res, next) {
  const { username, password } = req.body;
  console.log("유저네임", dbForUsers);

  // 유저 정보 매칭하기
  for (index in dbForUsers) {
    if (
      dbForUsers[index]["dbuserName"] === username &&
      dbForUsers[index]["dbpassWord"] === password
    ) {
      login = true;
    }
  }
  if (login === true) {
    console.log("비번도 맞아용");
    login = false;
    var randomKey = generateRandom(0, 10000);
    res.cookie("sid", randomKey);
    res.redirect("/"); // res는 하나만 쓸 수 있다~!~! 맨 위에있는 res.만 먹힘
  } else {
    res.render("error", { message: "아이디 패스워드가 일치하지 않습니다." });
  }
});

// 로그아웃 (쿠키에서 sid 삭제해주기)
router.post("/logout", function (req, res, next) {
  res.clearCookie("sid");
  res.redirect("/");
});

module.exports = router;
