#include <iostream>
#include <stack>
#include <deque>
#include <list>
#include <vector>
using namespace std;


int
main ()
{
  int a1[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
  //1. Not allowed - iterator constructor
  stack < int >s1 (a1, a1 + 10);
  //2. Not allowed - copy constructor source and target stack object using      
  // different storage containers
  stack < int, vector < int >>s2 (s1);
  //3. Not allowed - initialization using predefined container –
  //using different storage object than declared
  deque < int >d1 (a1, a1 + 10);
  stack < int, vector < int >>s3 (d1);

  return 0;
}