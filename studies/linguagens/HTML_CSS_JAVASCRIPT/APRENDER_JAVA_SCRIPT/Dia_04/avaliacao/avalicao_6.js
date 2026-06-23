let counter = 2;
let interval = setInterval(() => {
    console.log(counter);
// Insert missing line here.
}, 1000);

if (counter-- <= 0) clearInterval(interval);