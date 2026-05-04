//Modules protect their variables and function from leaking, to acces we need  by giving module.exports = calculateSume and import it using const calculateSum =
console.log("Sum module executed");

let x = "Hello World";

function calculateSum(a, b) {
  const sum = a + b;
  console.log(sum);
}

//we cannot directly use this so to export we use module.exports (remember exports);
module.exports = {
  //   x: x,
  //   calculateSum: calculateSum,
  //above  was old way now can just write and it will work
  x,
  calculateSum,
};

console.log(module.exports); //{}
//module.exports is an empty object so we can also use it as
// module.exports.calculateSum = calculateSum;
// module.exports.x = x;
