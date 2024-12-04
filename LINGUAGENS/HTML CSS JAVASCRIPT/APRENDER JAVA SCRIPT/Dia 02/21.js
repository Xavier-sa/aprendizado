console.log(Number(42)); // -> 42
   
console.log(Number("11")); // -> 11
console.log(Number("0x11")); // -> 17
console.log(Number("0o11")); // -> 9
console.log(Number("0b11")); // -> 3
console.log(Number("12e3")); // -> 12000
console.log(Number("Infinity"));// -> Infinity
console.log(Number("text")); // -> NaN
   
console.log(Number(14n)); // -> 14
console.log(Number(123456789123456789123n)); // - > 123456789123
456800000
   
console.log(Number(true)); // -> 1
console.log(Number(false)); // -> 0
   
console.log(Number(undefined)); // -> NaN
   
console.log(Number(null));// -> 0