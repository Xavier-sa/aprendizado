#include <stack>
#include <iostream>

using namespace std;

int
main ()
{
  stack < int >s1;
  if (s1.empty ())
    {
      s1.push (10);
    }
  cout << "Size of stack: " << s1.size () << endl;
  return 0;
}