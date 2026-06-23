#include <deque>
#include <list>
#include <vector>
#include <queue>
#include <functional>
using namespace std;

int
main ()
{
  int a1[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
  vector < int >v1 (a1, a1 + 10);
  //1. using external storage object only
  priority_queue < int >q1 (v1);
  //2. using forbidden container type as internal storage
  priority_queue < int, list < int >>q2;
  //3. providing comparator but not container type
  priority_queue < int, greater < int >>q3;
  //4. using different comparator object than declared - warning,
  //but the comparator object type is deducted from constructor parameter
  priority_queue < int >q4 (greater < int >());
  return 0;
}