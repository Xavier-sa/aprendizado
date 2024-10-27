#include <iostream>
#include <iomanip>

using namespace std;

int
main ()
{
  cout << "Current fill character: " << cout.
    fill () << ", code: " << (int) cout.fill () << endl;
  cout << "Current field width : " << cout.width () << endl;
  cout << 1 << 2 << 3 << endl;
  // changing width;
  cout << setw (3);
  cout << "Field width after change : " << cout.width () << endl;
  cout << 1 << 2 << 3 << endl;
  cout << "Width after output : " << cout.width () << endl;
  // changing width and fill
  cout << setw (3);
  cout << setfill ('_');
  cout << "Current fill character: " << cout.
    fill () << ", code: " << (int) cout.fill () << endl;
  cout << 1 << 2 << 3 << endl << endl;

  cout << "Setting width before each write:\n";
  cout << "adjustfield - not set/default:\n";
  for (unsigned i = 1; i <= 3; ++i)
    {
      cout << setw (3) << i;
    }
  cout << endl;

  cout << "adjustfield - left:\n";
  cout << left;
  for (unsigned i = 1; i <= 3; ++i)
    {
      cout << setw (3) << i;
    }
  cout << endl;

  cout << "adjustfield - internal:\n";
  cout << internal;
  for (unsigned i = 1; i <= 3; ++i)
    {
      cout << setw (3) << i;
    }
  cout << endl;

  cout << "adjustfield - right:\n";
  cout << right;
  for (unsigned i = 1; i <= 3; ++i)
    {
      cout << setw (3) << i;
    }
  cout << endl;
  return 0;
}