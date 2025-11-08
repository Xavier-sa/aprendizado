// <!DOCTYPE html>
// <html>
// <head>
//     <script src="main.js"></script>
// </head>
// <body>
//     <p>Test Site</p>
// </body>
// </html>



function outer() {
    let name = "outer";
    let str = inner();
    return str;
}
function inner() {
    let name = "inner";
    return "Hello !";
}
console.log("before outer() call");
console.log(outer());
console.log("after outer() call");
