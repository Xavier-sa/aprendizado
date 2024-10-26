/* finding the larger of two numbers */

#include <iostream>
using namespace std;

int main(void) {
  /* the two numbers */
  int number1, number2;

  /* we will save the larger number here */
  int max;

  /* read two numbers */
  cin >> number1;
  cin >> number2;

  /* we temporarily assume that the former number is the larger one */
  /* we will check it soon */
  max = number1;

  /* we check if the assumption was false */
  if (number2 > max)
    max = number2;

  /* we print the result */
  cout << "The larger number is " << max << endl;

  /* we finish the program successfully */
  return 0;
}