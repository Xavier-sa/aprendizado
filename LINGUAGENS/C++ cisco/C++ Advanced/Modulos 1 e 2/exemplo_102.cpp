#include <queue>
#include <iostream>

using namespace std;

int
main ()
{
  queue < int >q1;
  if (q1.empty ())
    {
      q1.push (100);
    }
  cout << "Size of queue: " << q1.size () << endl;
  return 0;
}