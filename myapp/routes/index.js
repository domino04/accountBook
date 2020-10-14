var express = require("express");
var router = express.Router();

/* GET home page. */

let isAuth = false;

router.get("/", function (req, res, next) {
  console.log("쿠키s아이디", req.cookies.sid);
  if (!req.cookies.sid) {
    res.render("index.html");
  }
});

// 글 저장하기
router.post("/list", function (req, res, next) {
  // 디비에 글 저장한다
  // 인덱스 페이지로 리렌더링
  console.log("저장", req.body);
  res.redirect("/");
});

// 글 삭제 팝업 띄우기
router.get("/delete/popup", function (req, res, next) {
  console.log("팝업에 넣을 pk 정보", req);
  // 팝업을 띄운다.
  // res.render("popUp", { content: "팝업입니다." });
});
// 글 삭제하기
router.post("/delete", function (req, res, next) {
  // post로 보내온 글의 pk 확인한다.
  // 디비에서 해당 pk의 글을 찾는다.
  // 해당 글 삭제
});

// 글 수정하기
router.post("/edit", function (req, res, next) {
  // post로 보내온 글의 pk 확인한다.
  // 디비에서 해당 pk의 글을 찾는다.
  // post로 보내온 수정된 사항으로 대체한다.
});

module.exports = router;
