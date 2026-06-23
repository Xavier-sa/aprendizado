def solution(s):
    result = []

    for char in s:
        if 'a' <= char <= 'z':  # Check if the character is a lowercase letter
            if char == 'z':
                result.append('a')
            else:
                result.append(chr(ord(char) + 1))
        elif 'A' <= char <= 'Z':  # Check if the character is an uppercase letter
            if char == 'Z':
                result.append('A')
            else:
                result.append(chr(ord(char) + 1))
        else:
            result.append(char)  # If it's not a letter, add it unchanged
    
    return ''.join(result)

# Example usage
input_string = "abc123XYz!"
output_string = solution(input_string)
print(output_string)
