#include <vector>
#include <iostream>

using namespace std;

class A
{
  int number;
public:
    explicit A (int _number):number (_number)
  {
  }
};

int
main ()
{
  vector < A > v1;
  v1.push_back (1);		// compilation error
  return 0;
}