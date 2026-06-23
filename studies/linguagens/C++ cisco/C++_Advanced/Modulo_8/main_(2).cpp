#include <iostream>
#include <string>

using namespace std;

int
main ()
{
  string s = "Hello world!";
  for (unsigned i = 0; i < s.size (); ++i)
    {
      cout.put (s[i]);
    }
  cout.put ('\n');
  // do not try to put more than one character at a time
  //cout.put("\n");
  return 0;
}