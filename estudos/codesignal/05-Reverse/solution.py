def solution(s):
    # Convert the string to a list to be able to modify it
    s = list(s)
    
    # Loop through the string in steps of 2
    for i in range(0, len(s) - 1, 2):
        # Swap characters at index i and i+1
        s[i], s[i + 1] = s[i + 1], s[i]
    
    # Convert the list back to a string
    return ''.join(s)

# Example usage
print(solution("abcdef"))  # Output: "badcfe"
print(solution("hello"))   # Output: "ehllo"
