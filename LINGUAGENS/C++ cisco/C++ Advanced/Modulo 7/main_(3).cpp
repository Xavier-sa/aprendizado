#include <iostream>
#include <vector>
#include <algorithm>
#include <iterator>
#include <ctype.h>
#include <string>
#include <functional>

using namespace std;


int
main ()
{
  less < int >l;
  less_equal < int >le;
  greater < int >g;
  greater_equal < int >ge;
  equal_to < int >e;
  not_equal_to < int >ne;

  cout << "Comparing A and B using various operators:\n";
  cout << boolalpha;

  int a = 5, b = 5;
  cout << "A=5, B=5:\n";
  cout << "less(A,B)=            " << l (a, b) << endl;
  cout << "less_equal(A,B)=      " << le (a, b) << endl;
  cout << "greater(A,B)=         " << g (a, b) << endl;
  cout << "greater_equal(A,B)=   " << ge (a, b) << endl;
  cout << "equal(A,B)=           " << e (a, b) << endl;
  cout << "not_equal(A,B)=       " << ne (a, b) << endl << endl;

  a = 6;
  b = 5;
  cout << "A=6, B=5:\n";
  cout << "less(A,B)=            " << l (a, b) << endl;
  cout << "less_equal(A,B)=      " << le (a, b) << endl;
  cout << "greater(A,B)=         " << g (a, b) << endl;
  cout << "greater_equal(A,B)=   " << ge (a, b) << endl;
  cout << "equal(A,B)=           " << e (a, b) << endl;
  cout << "not_equal(A,B)=       " << ne (a, b) << endl << endl;

  a = 5;
  b = 6;
  cout << "A=5, B=6:\n";
  cout << "less(A,B)=            " << l (a, b) << endl;
  cout << "less_equal(A,B)=      " << le (a, b) << endl;
  cout << "greater(A,B)=         " << g (a, b) << endl;
  cout << "greater_equal(A,B)=   " << ge (a, b) << endl;
  cout << "equal(A,B)=           " << e (a, b) << endl;
  cout << "not_equal(A,B)=       " << ne (a, b) << endl << endl;

  return 0;
}