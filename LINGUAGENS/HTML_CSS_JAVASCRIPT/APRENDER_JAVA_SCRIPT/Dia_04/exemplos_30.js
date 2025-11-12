
for (let i = 0; i < numbers.length; i++) {
    let result;
    try {
        result = div(1000, numbers[i]);
    } catch (e) {
        result = e.message;
    }
    console.log(result);
}
