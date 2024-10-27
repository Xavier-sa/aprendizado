#include <vector>
#include <iostream>

using namespace std;

class A
{
  int number;
public:
    A (int _number):number (_number)
  {
    cout << "Normal constructor\n";
  }
  A ()
  {
    cout << "Default constructor\n";
  }

  A (const A & source)
  {
    number = source.number;
    cout << "Copy constructor\n";
  }

  A & operator= (const A & source)
  {
    number = source.number;
    cout << "Assignment operator\n";
    return *this;
  }

  ~A ()
  {
    cout << "Destructor\n";
  }
};

int
main ()
{
  vector < A > v1;
  v1.push_back (1);
  cout << "First ready!\n";
  v1.push_back (2);
  cout << "Second ready!\n";
  v1.push_back (3);
  cout << "Third ready!\n";
  return 0;
}