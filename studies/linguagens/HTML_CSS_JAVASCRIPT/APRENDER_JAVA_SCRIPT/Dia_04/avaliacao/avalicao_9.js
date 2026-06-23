let x = mult(2)(10);
console.log(x); // -> 20

let mult = function (a, b) {
    return b ? mult(b) : mult(a);
}