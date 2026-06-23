def solution(input_string):
    result = []

    for char in input_string:
        # Check if the character is a lowercase letter
        if 'a' <= char <= 'z':
            # Convert to uppercase by subtracting 32 from the ASCII value
            result.append(chr(ord(char) - 32))
        # Check if the character is an uppercase letter
        elif 'A' <= char <= 'Z':
            # Convert to lowercase by adding 32 to the ASCII value
            result.append(chr(ord(char) + 32))
        else:
            # Non-alphabetic characters remain unchanged
            result.append(char)
    
    return ''.join(result)

# Example usage
input_string = "HelLo WoRld 123"
output_string = solution(input_string)
print(output_string)
