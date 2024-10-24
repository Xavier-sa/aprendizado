
function add(a, b) {
    return a + b;
}
let myAdd = add;
console.log(myAdd(10, 20)); 	// -> 30
console.log(add(10, 20));	// -> 30
