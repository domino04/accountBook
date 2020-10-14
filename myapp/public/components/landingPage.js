console.log(lists);

// 쿼리셀렉터
function $(target) {
  return document.querySelector(target);
}

// 부모요소 지정 후 자식 div 만들기
function createElementFunc(parent, tagname, idClass, name) {
  const child = document.createElement(tagname);
  child.setAttribute(idClass, name);
  parent.appendChild(child);
}

// 디브 안에 내용물 채워넣기
function divPainter(targetDiv, inner) {
  targetDiv.innerHTML = inner;
}

const body = $("body");
createElementFunc(body, "div", "id", "container");
const innerContainer = `
      <div id="header" class="row">
        <div id="header-left">결제수단선택</div>
        <div id="header-center">가계부</div>
        <div id="header-right">결제수단선택</div>
      </div>
      <div id="main" class="col">
        <div id="main-month" class="row">
          <div id="main-month-navLeft" class="col">
            <span id="navLeft" class="material-icons">arrow_back_ios</span>
          </div>
          <div id="main-month-current">6월</div>
          <div id="main-month-navRight" class="col">
            <span id="navRight" class="material-icons">arrow_forward_ios</span>
          </div>
        </div>
        <div id="main-nav" class="row">
          <div id="main-nav-list" class="main-nav-each col selected">내역</div>
          <div id="main-nav-calander" class="main-nav-each col">달력</div>
          <div id="main-nav-statistic" class="main-nav-each col">통계</div>
        </div>
        <div id="main-container"></div>
      </div>
    </div>
      `;
const containerDiv = $("#container");
divPainter(containerDiv, innerContainer);
const mainContainerDiv = $("#main-container");

// 내역 버튼이 눌리면 해당 내용을 create

let listFilterState = 1;
let categoryOptions = `<label for="list-filter-category-inner">카테고리</label><select name="" id="list-filter-category-inner"><option>선택하세요</option><option>월급</option><option>용돈</option><option>기타수입</option></select>`;

createElementFunc(mainContainerDiv, "div", "id", "list");
const innerList = `<div id="list-filter">
<form action="/list" method="POST">
  <div id="list-filter-1st">
    <label>분류</label>
    <button id="list-filter-in-btn"  class="inOut-btn selected">수입</button>
    <button id="list-filter-out-btn" class="inOut-btn">지출</button>
  </div>
  <div id="list-filter-2nd" class="row">
    <div>
      <label for="">날짜</label>
      <input type="date" id="list-filter-date" />
    </div>
    <div id="list-filter-category">
    </div>
    <div>
      <label for="list-filter-payWay">결제수단</label>
      <select name="" id="list-filter-payWay">
        <option>선택하세요</option>
        <option>카드</option>
        <option>현금</option>
      </select>
    </div>
  </div>
  <div id="list-filter-3rd" class="row">
    <div>
      <label for="list-filter-cost">금액</label>
      <input type="number" id="list-filter-cost" />
    </div>
    <div>
      <label for="list-filter-content">내용</label>
      <input type="text" id="list-filter-content" />
    </div>
  </div>
  <button type="submit" id="list-btn">확인</button>
</form>
</div>

<div id="list-list"></div>
</div>
`;
const listDiv = $("#list");
divPainter(listDiv, innerList);
$("#list-filter-category").innerHTML = categoryOptions;

// 내역 버튼이 눌리면 해당 내용을 cerate
// 일별로 나눠주기
function listDateRendering(list) {
  const oneDayList = list.map(
    (one) => `
    <div id="date-${one}" class="one-day-div">
    <div id="date-${one}-top" class="one-day-div-top row">${one}</div>
    <div id="date-${one}-list"></div>
    </div>
  `
  );

  let monthList = oneDayList.join("");
  $("#list-list").innerHTML = monthList;
  console.log("gg");
}

listDateRendering(daysArray);

// 하나 하나 내역
function listOneRendering(list, date) {
  const oneList = list.map(
    (one) => `
  <div class="each-list-${one.inOut} row">
    <div class="each-list-left row">
      <div class="each-list-category row">${one.category}</div>
      <div class="each-list-content row">${one.content}</div></div>
    <div class="each-list-right row">
      <div class="each-list-payWay row">${one.payWay}</div>
      <div class="each-list-cost row">${one.inOut}${one.cost}원</div>
    </div>
  </div>
  `
  );
  let dayList = oneList.join("");
  console.log("dayList", dayList);
  $(`#date-${date}-list`).innerHTML = dayList;
}

for (let i = 0; i < daysArray.length; i++) {
  let oneDayArray = lists.filter((one) => one.date === daysArray[i]);
  listOneRendering(oneDayArray, daysArray[i]);
}

const formInBtn = $("#list-filter-in-btn");
const formOutBtn = $("#list-filter-out-btn");

formInBtn.addEventListener("click", function (event) {
  event.preventDefault();
  formInBtn.classList.add("selected");
  formOutBtn.classList.remove("selected");
  listFilterState = 1;
  categoryOptions = `<label for="list-filter-category-inner">카테고리</label><select name="" id="list-filter-category-inner"><option>선택하세요</option><option>월급</option><option>용돈</option><option>기타수입</option></select>`;
  $("#list-filter-category").innerHTML = categoryOptions;
  console.log("수입지출", listFilterState);
});
formOutBtn.addEventListener("click", function (event) {
  event.preventDefault();
  formInBtn.classList.remove("selected");
  formOutBtn.classList.add("selected");
  listFilterState = 2;
  categoryOptions = `<label for="list-filter-category-inner">카테고리</label><select name="" id="list-filter-category-inner"><option>선택하세요</option><option>식비</option><option>생활</option><option>쇼핑/뷰티</option><option>교통</option><option>의료/건강</option><option>문화/여가</option><option>미분류</option></select>`;
  $("#list-filter-category").innerHTML = categoryOptions;
  console.log("수입지출", listFilterState);
});
$("#list-btn").addEventListener("click", submitHandler);

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

function submitHandler(event) {
  let variable = JSON.stringify({
    inOut: "d",
    date: "d",
    category: "inputValue",
    payWay: "아직 구현 못함",
    cost: "d",
    content: "d",
  });

  let reqOpt = {
    method: "POST",
    headers: myHeaders,
    body: variable,
  };

  fetch("http://localhost:8080/list", reqOpt);
}

// 달력 버튼이 눌리면 해당 내용을 create

// 통계 버튼이 눌리면 해당 내용을 create
