var express = require("express");
var router = express.Router();

/* GET home page. */

let isAuth = false;

const AllCategory = ["willDo", "doing", "done", "new"];
const AllList = [
  {
    pk: 0,
    status: 1,
    category: "willDo",
    title: "에벱뻽ㅂ",
    author: "nigayo",
    index: 1,
  },
  {
    pk: 1,
    status: 1,
    category: "willDo",
    title: "멋사 과제",
    author: "이소영",
    index: 2,
  },
  {
    pk: 2,
    status: 2,
    category: "doing",
    title: "저녁먹기",
    author: "이한주",
    index: 3,
  },

  {
    pk: 3,
    status: 3,
    category: "done",
    title: "점심먹기",
    author: "강단비",
    index: 4,
  },
];

router.get("/", function (req, res, next) {
  console.log("쿠키s아이디", req.cookies.sid);
  if (!req.cookies.sid) {
    res.render("index", {
      title: ":::TODOLIST:::",
      AllCategory: AllCategory,
      AllList: AllList,
    });
  } else {
    isAuth = true;
    res.render("auth_index", {
      title: ":::TODOLIST:::",
      AllCategory: AllCategory,
      AllList: AllList,
    });
  }
});

// 글 저장하기
router.post("/", function (req, res, next) {
  // 디비에 글 저장한다
  // 인덱스 페이지로 리렌더링
});

// 글 삭제 팝업 띄우기
router.get("/delete/popup", function (req, res, next) {
  console.log("팝업에 넣을 pk 정보", req);
  // 팝업을 띄운다.
  res.render("popUp", { content: "팝업입니다." });
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
