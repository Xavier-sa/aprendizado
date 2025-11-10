
function operation(func, first, second) {
    return func(first, second);
}
let myAdd = function(a, b) {
    return a + b;
}
console.log(operation(myAdd, 10, 20)); // -> 30
console.log(operation(function(a, b) {
    return a * b;
}, 10, 20)); // -> 200
