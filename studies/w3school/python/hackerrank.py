#!/bin/python3

import math
import os
import random
import re
import sys

# Complete the 'plusMinus' function below.
# The function accepts INTEGER_ARRAY arr as parameter.

def plusMinus(arr):
    positive = 0
    negative = 0
    zero = 0
    
    # Count positive, negative and zero elements
    for num in arr:
        if num > 0:
            positive += 1
        elif num < 0:
            negative += 1
        else:
            zero += 1
    
    # Calculate and print the ratios with 6 decimal places
    total = len(arr)  # Total number of elements in the array
    print("{:.6f}".format(positive / total))  # Ratio of positives
    print("{:.6f}".format(negative / total))  # Ratio of negatives
    print("{:.6f}".format(zero / total))     # Ratio of zeros

if __name__ == '__main__':
    # Read the number of elements in the array
    n = int(input().strip())  # Number of elements in the array
    
    # Read the array elements and convert to a list of integers
    arr = list(map(int, input().rstrip().split()))

    # Call the function to calculate the ratios
    plusMinus(arr)
