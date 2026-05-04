require("./xyz.js");

//to import private variables and function use
// const { x, calculateSum } = require("./calculate/sum.js");
// const { caculateMultiply } = require("./calculate/multiply.js");

//use below after grouping exports in one folder
const { calculateSum, calculateMultiply } = require("./calculate");
const data = require("./data.json");

let name = "Manish";

let a = 23;
let b = 23;
calculateSum(a, b);

calculateMultiply(a, b);
console.log(data);
// console.log(x);
console.log(globalThis === global);
