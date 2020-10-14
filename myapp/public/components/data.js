const lists = [
  {
    index: 0,
    inOut: "in",
    date: "2020-10-14",
    category: "salary",
    payWay: "카카오뱅크",
    cost: 2400000,
    content: "라이크낫 월급",
  },
  {
    index: 1,
    inOut: "in",
    date: "2020-10-02",
    category: "else",
    payWay: "현대카드",
    cost: 7300,
    content: "휴대폰 환급금",
  },
  {
    index: 2,
    inOut: "out",
    date: "2020-10-06",
    category: "food",
    payWay: "카카오뱅크",
    cost: 15000,
    content: "꽌부이",
  },
  {
    index: 3,
    inOut: "in",
    date: "2020-10-06",
    category: "living",
    payWay: "카카오뱅크",
    cost: 21000,
    content: "샴푸",
  },
];

let dateList = [];
for (let i = 0; i < lists.length; i++) {
  dateList.push(lists[i]["date"]);
}
dateList.sort();

let daysArray = dateList.filter(
  (item, index) => dateList.indexOf(item) === index
);
console.log("하이", daysArray);
