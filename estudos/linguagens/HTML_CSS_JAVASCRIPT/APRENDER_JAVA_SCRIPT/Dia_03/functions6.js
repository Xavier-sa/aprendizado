let a = 100, b = 200, c = 300;
function test(a) {
     let b = 10;
     console.log(a); // parameter a
     console.log(b); // local variable b
     console.log(c); // global variable c
}
test(1);   // -> 1
      // -> 10
      // -> 300
console.log(a); // -> 100
console.log(b); // -> 200
console.log(c); // -> 300
