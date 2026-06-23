function execute(todo, a, b) {
    return todo(a, b);
    }
    console.log(execute(power, 3, 2));

    
    let power = (x, y) => x ** y;