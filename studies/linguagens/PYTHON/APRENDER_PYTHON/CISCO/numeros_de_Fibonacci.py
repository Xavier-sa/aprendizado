def fib(n):
    if n < 1:
        return None
    if n < 3:
        return 1
 
    elem_1 = elem_2 = 1
    the_sum = 0
    for i in range(3, n + 1):
        the_sum = elem_1 + elem_2
        elem_1, elem_2 = elem_2, the_sum
    return the_sum
 
 
for n in range(1, 10):  # testando
    print(n, "->", fib(n))
 
def fib(n):
    if n < 1:
        return None
    if n < 3:
        return 1
    return fib(n - 1) + fib(n - 2)
 
def factorial_function(n):
    if n < 0:
        return None
    if n < 2:
        return 1
    return n * factorial_function(n - 1)
 
def factorial(n):
    return n * factorial(n - 1)
 
 
print(factorial(4))

def fun(a):
    if a > 30:
        return 3
    else:
        return a + fun(a + 3)
 
 
print(fun(25))
 
