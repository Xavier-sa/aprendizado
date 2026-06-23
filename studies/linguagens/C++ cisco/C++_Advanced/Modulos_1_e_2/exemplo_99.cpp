#include <stack>
#include <iostream>
using namespace std;

int
main ()
{
  stack < int >s1;

  if (s1.empty ())
    {
      cout << "The stack is empty!\n";
    }

  s1.push (3);
  s1.push (2);
  s1.push (1);

  cout << "Size: " << s1.size () << endl;
  cout << "Top element: " << s1.top () << endl;
  cout << "Size: " << s1.size () << endl;
  s1.pop ();
  cout << "Top element: " << s1.top () << endl;
  cout << "Size: " << s1.size () << endl;
  return 0;
}