let action = (callback, a, b) => callback(a, b);
// or
let action = function (callback, a, b) {
    return callback(a, b);
}
// or
function action(callback, a, b) {
    return callback(a, b);
}
