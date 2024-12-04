#include <iostream>
#include <queue>
#include <deque>
#include <vector>
#include <functional>
using namespace std;

int
main ()
{
  int a1[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
  //1. default constructor
  priority_queue < int >s1;
  //2. copy constructor;
  priority_queue < int >s2 (s1);
  //3. initiilization using iterators
  vector < int >v1 (a1, a1 + 10);
  priority_queue < int >s3 (v1.begin (), v1.end ());

  //4. using non-default storage
  priority_queue < int, deque < int >>s4;

  //5. Providing different comparator type
  priority_queue < int, vector < int >, greater < int >>s5;
  return 0;
}