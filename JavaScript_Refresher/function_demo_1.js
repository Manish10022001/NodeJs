//function declaration
function add(a,b){
    console.log(a+b);
}
add(3,3);

//function expression
function sub(a,b){
    console.log(a-b)
}
sub(3,2);

//self-invoked function
(function(a,b){
    console.log(a*b)
})(2,2);