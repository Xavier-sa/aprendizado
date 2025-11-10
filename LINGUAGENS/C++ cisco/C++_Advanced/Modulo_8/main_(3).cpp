#include <iostream>

using namespace std;

int
main ()
{
  cout << "Current fill character: " << cout.
    fill () << ", code: " << (int) cout.fill () << endl;
  cout << "Current field width : " << cout.width () << endl;
  cout << 1 << 2 << 3 << endl;
  // changing width;
  cout.width (3);
  cout << "Field width after change : " << cout.width () << endl;
  cout << 1 << 2 << 3 << endl;
  cout << "Width after output : " << cout.width () << endl;
  // changing width and fill
  cout.fill ('_');
  cout << "Current fill character: " << cout.
    fill () << ", code: " << (int) cout.fill () << endl;
  cout.width (3);
  cout << 1 << 2 << 3 << endl << endl;

  cout << "Setting width before each write:\n";
  cout << "adjustfield - not set/default:\n";
  for (unsigned i = 1; i <= 3; ++i)
    {
      cout.width (3);
      cout << i;
    }
  cout << endl;

  cout << "adjustfield - left:\n";
  cout.setf (ios::left, ios::adjustfield);
  for (unsigned i = 1; i <= 3; ++i)
    {
      cout.width (3);
      cout << i;
    }
  cout << endl;

  cout << "adjustfield - internal:\n";
  cout.setf (ios::internal, ios::adjustfield);
  for (unsigned i = 1; i <= 3; ++i)
    {
      cout.width (3);
      cout << i;
    }
  cout << endl;

  cout << "adjustfield - right:\n";
  cout.setf (ios::right, ios::adjustfield);
  for (unsigned i = 1; i <= 3; ++i)
    {
      cout.width (3);
      cout << i;
    }
  cout << endl;
  return 0;
}