def solution(s):
    vowels = "aeiouAEIOU"  # String containing all vowels (both lowercase and uppercase)
    positions = []  # List to store the positions of vowels
    
    # Iterate through the string with the index
    for i in range(len(s)):
        # Check if the current character is a vowel
        if s[i] in vowels:
            positions.append(i)  # Append the index to the positions list
    
    return positions

# Example usage:
print(solution("Hello WORLD"))  # Output: [1, 4, 7]
