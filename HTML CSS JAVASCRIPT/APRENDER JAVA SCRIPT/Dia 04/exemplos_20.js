let a = 10;
try {
    a = b;  // First ReferenceError
} catch (error) {
    console.log(b); // Second ReferenceError
 
}
console.log("Finally!");


