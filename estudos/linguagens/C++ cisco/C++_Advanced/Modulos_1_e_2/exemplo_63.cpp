#include <vector>
#include <iostream>

using namespace std;

int
main ()
{
  vector < int >v;
  cout << "Size and capacity: " << v.size () << " " << v.capacity () << endl;

  for (int i = 0; i < 20; ++i)
    {
      v.push_back (i);
      cout << "Size and capacity: " << v.size () << " " << v.
	capacity () << endl;
    }
  return 0;
}