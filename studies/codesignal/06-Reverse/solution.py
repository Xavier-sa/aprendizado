def solution(input_string):
    # Initialize two pointers
    left = 0
    right = len(input_string) - 1
    
    while left < right:
        # Skip non-alphabetic characters from the left pointer
        while left < right and not input_string[left].isalpha():
            left += 1
        # Skip non-alphabetic characters from the right pointer
        while left < right and not input_string[right].isalpha():
            right -= 1
        
        # Compare characters (ignoring case)
        if input_string[left].lower() != input_string[right].lower():
            return False
        
        # Move the pointers towards the center
        left += 1
        right -= 1
    
    return True
