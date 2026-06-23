
// It’s a pretty common situation to have a value of one type but to need a value of another type. The simplest example is when we have a number, but we need to add it to some text. Conversions in JavaScript happen automatically in specific situations, but can also be used explicitly through functions like String() or Number(). Earlier we saw how those functions could be used to create default values of those types, but that’s not all they can do. Those functions also accept arguments in parentheses and (if possible) will convert them to a given type.




const num = 42;
   
const strFromNum1 = String(num);
const strFromNum2 = String(8);
const strFromBool = String(true);
const numFromStr = Number("312");
const boolFromNumber = Boolean(0);