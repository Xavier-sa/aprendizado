# Reversing a string manually
original_string = "hello"
reversed_string = ""
for i in range(len(original_string) - 1, -1, -1):
    reversed_string += original_string[i]

print(reversed_string)  # Output: "olleh"