my_list = [1, None, True, 'eu sou um barbante', 256, 0]
print(my_list[3])  # outputs: eu sou um barbante
print(my_list[-1])  # outputs: 0
 
my_list[1] = '?'
print(my_list)  # outputs: [1, '?', True, 'eu sou um barbante', 256, 0]
 
my_list.insert(0, "primeiro")
my_list.append("último")
print(my_list)  # outputs: ['primeiro', 1, '?', True, 'eu sou um barbante', 256, 0, 'último']
 
