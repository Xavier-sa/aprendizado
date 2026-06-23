# lst = [[x for x in range(3)] for y in range(3)]
 
# for r in range(3):
#     for c in range(3):
#         if lst[r][c] % 2 != 0:
#             print("#")
            
            
# try:
#     print(5/0)
#     break
# except:
#     print("Desculpe, algo deu errado...")
# except (ValueError, ZeroDivisionError):
#     print("Muito ruim...")            



# try:
#     value = input("Digite um valor: ")
#     print(int(value)/len(value))
# except ValueError:
#     print("Entrada ruim...")
# except ZeroDivisionError:
#     print("Entrada muito ruim...")
# except TypeError:
#     print("Muito, muito ruim entrada...")
# except:
#     print("Booo!")



# lst = [[x for x in range(3)] for y in range(3)]
 
# for r in range(3):
#     for c in range(3):
#         if lst[r][c] % 2 != 0:
#             print("#")



# def fun(inp=2, out=3):
#     return inp * out
 
 
# print(fun(out=2))






# dct = {}
# dct['1'] = (1, 2)
# dct['2'] = (2, 1)
 
# for x in dct.keys():
#     print(dct[x][1], end="")




# dd = {"1": "0", "0": "1"}
# for x in dd.vals():
#     print(x, end="")



# tup = (1, 2, 4, 8)
# tup = tup[-2:-1]
# tup = tup[-1]
# print(tup)


# i = 0
# while i < i + 2 :
#     i += 1
#     print("*")
# else:
#     print("*")


# def fun(x, y):
#     if x == y:
#         return x
#     else:
#         return fun(x, y-1)
 
 
# print(fun(0, 3))


# lst = [i for i in range(-1, -2)]
 
# print(lst)

# dct = {'one': 'two', 'three': 'one', 'two': 'three'}
# v = dct['three']
 
# for k in range(len(dct)):
#     v = dct[v]
 
# print(v)
 
# x = float(input(2))
# y = float(input(4))
# print(y ** (1 / x))

# x = 1 // 5 + 1 / 5
# print(x)

# print("a", "b", "c", sep="sep")


# y = input(3)
# x = input(6)
# print(x + y)


# x = int(input(3))
# y = int(input(2))
# x = x % y
# x = x % y
# y = y % x
# print(y)
 


# def fun(x):
#     if x % 2 == 0:
#         return 1
#     else:
#         return 2
 
 
# print(fun(fun(2)))
 


# a = 1
# b = 0
# a = a ^ b
# b = a ^ b
# a = a ^ b
 
# print(a, b)


# x = 1
# y = 2
# x, y, z = x, x, y
# z, y, z = x, y, z
 
# print(x, y, z)



# my_list = [x * x for x in range(5)]
 
 
# def fun(lst):
#     del lst[lst[2]]
#     return lst
 
 
# print(fun(my_list))



# z = 0
# y = 10
# x = y < z and z > y or y < z and z < y
# print(x)




# def func(a, b):
#     return b ** a
 
 
# print(func(b=2, 2))


# a = 1 // 2
# print(a)


# def function_1(a):
#     return None
 
 
# def function_2(a):
#     return function_1(a) * function_1(a)
 
 
# print(function_2(2))



my_list = [1, 2]
 
for v in range(2):
    my_list.insert(-1, my_list[v])
 
print(my_list)