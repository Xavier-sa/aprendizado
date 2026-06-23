#include<iostream>

#include<stack>

#include<deque>

#include<list>

#include<vector>

using namespace std;

int
main ()
{

  int a1[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

  deque < int >d1 (a1, a1 + 10);

  stack < int >s1;

  stack < int >s2 (d1);

  //1. Correct - source and target stack are of the same type

  s1 = s2;

  cout << s1.size () << ":" << s2.size () << endl;

  stack < int, vector < int >>s3;

  //2. Incorrect - target and source stack are not of the same type

  //s3 = s2;

  return 0;
}