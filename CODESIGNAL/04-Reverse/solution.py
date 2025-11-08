def replace_character(input_string, c1, c2):
    result = []

    # Loop through each character in the input string
    for char in input_string:
        if char == c1:
            # Replace occurrences of c1 with c2
            result.append(c2)
        else:
            # Keep characters that are not equal to c1
            result.append(char)

    # Join the list of characters to form the final string
    return ''.join(result)

# Example usage
input_string = "hello, world"
output_string = replace_character(input_string, "o", "a")
print(output_string)
