#include <iostream>
#include <vector>
#include <algorithm>
#include <iterator>

using namespace std;

template < class T > void
print (const T & value)
{
  cout << value << " ";
}

struct Pred
{
  int value;
    Pred (const int &v):value (v)
  {
  }
  bool operator () (const int &a)
  {
    return a < value;
  }
};

int
main ()
{
  int t[] = { 1, 10, 8, 4, 5, 6, 7, 3, 9, 2 };
  vector < int >v1 (t, t + 10);
  cout << "Source collection:\n";
  cout << "v1: ";
  for_each (v1.begin (), v1.end (), print < int >);
  cout << endl << endl;

  cout << "Normal partitioning:\n";
  vector < int >::iterator it = partition (v1.begin (), v1.end (), Pred (5));
  cout << "Partitioning into two groups: < 5 and > 5:\n";
  cout << "v1: ";
  for_each (v1.begin (), v1.end (), print < int >);
  cout << endl;
  cout << "The first group: ";
  for_each (v1.begin (), it, print < int >);
  cout << endl;
  cout << "The second group: ";
  for_each (it, v1.end (), print < int >);
  cout << endl << endl;

  cout << "Stable partitioning:\n";
  copy (t, t + 10, v1.begin ());	//reinitializing collection;
  it = stable_partition (v1.begin (), v1.end (), Pred (5));
  cout << "Partitioning into two groups: < 5 and > 5:\n";
  cout << "v1: ";
  for_each (v1.begin (), v1.end (), print < int >);
  cout << endl;
  cout << "The first group: ";
  for_each (v1.begin (), it, print < int >);
  cout << endl;
  cout << "The second group: ";
  for_each (it, v1.end (), print < int >);
  cout << endl;

  return 0;
}