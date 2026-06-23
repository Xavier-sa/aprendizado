def hi():
    return
    print("Oi!")
 
hi()
 


def is_int(data):
    if type(data) == int:
        return True
    elif type(data) == float:
        return False
 
print(is_int(5))
print(is_int(5.0))
print(is_int("5"))
 

def even_num_lst(ran):
    lst = []
    for num in range(ran):
        if num % 2 == 0:
            lst.append(num)
    return lst
 
print(even_num_lst(11))
 

def list_updater(lst):
    upd_list = []
    for elem in lst:
        elem **= 2
        upd_list.append(elem)
    return upd_list
 
foo = [1, 2, 3, 4, 5]
print(list_updater(foo))
 
def bmi(weight, height):
    return weight / height ** 2
 
 
print(bmi(52.5, 1.65))
 
