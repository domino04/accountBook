var createError = require("http-errors"); // 에러를 만들어내고 싶을 때
var express = require("express");
var path = require("path"); // 경로 조작하기 위해서
var cookieParser = require("cookie-parser");
var logger = require("morgan"); // 사용자가 접속할 때마다 로그 표시

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
var ejs = require("ejs");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", ejs.renderFile);

app.use(logger("dev")); // 환경변수 개발자 모드로 세팅
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // post form 때문에
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public"))); // 퍼블릭 디렉토리 설정 때문에 // 라우터 설정보다 위에 놓는게 좋음. 위에서부터 밑으로 내려가니까 괜히 어? 스태틱 없네 이러고 내려갔다가 다시 올라오게 하지 않도록.

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler  여기까지 도달했다는 것은 제대로 실행이 안되었다..! === 에러상황이다
app.use(function (req, res, next) {
  next(createError(404)); // next에 변수가 채워져있음.  매개변수가 있으면 error-handler
});

// error handler    매개변수 4개
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
