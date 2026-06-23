#python: Check if number is prime!


num = int(input("Qual numero?"))

print("Prime" if all(num % i != 0 for i in range (2, num)) and num > 1 else "Not Prime!")