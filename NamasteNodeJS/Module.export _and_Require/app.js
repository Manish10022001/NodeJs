require("./xyz.js");

//to import private variables and function use
const { x, calculateSum } = require("./sum.js");
let name = "Manish";

let a = 23;
let b = 23;
calculateSum(a, b);

console.log(x);
console.log(globalThis === global);
