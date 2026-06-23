#include <vector>
#include <iostream>

using namespace std;

int
main ()
{
  vector < int >v;
  cout << "Size and capacity: " << v.size () << " " << v.capacity () << endl;
  v.reserve (15);
  cout << "Size and capacity: " << v.size () << " " << v.capacity () << endl;
  cout << "Adding elements" << endl;
  for (int i = 0; i < 10; ++i)
    {
      v.push_back (i);
      cout << "Size and capacity: " << v.size () << " " << v.
	capacity () << endl;
    }
  cout << "Trying to shrink..." << endl;
  v.reserve (10);
  cout << "Size and capacity: " << v.size () << " " << v.capacity () << endl;
  return 0;
}