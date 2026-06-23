
console.log(typeof declaredVar); // -> undefined
   
declaredVar = 5;
console.log(typeof declaredVar); // -> number
   
declaredVar = undefined;
console.log(typeof declaredVar); // -> undefined
   

   
Console.log(typeof notDeclaredVar); // -> undefined
console.log(notDeclaredVar); // -> Uncaught ReferenceError: notDeclared is not defined