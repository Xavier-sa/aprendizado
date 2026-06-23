#include <iostream>

using namespace std;

int
main (int argc, char **argv)
{
  char c;
  char buff[255];

  cout << "Reading single character:\n";
  c = cin.get ();
  cout << "Value read: " << c << endl;

  cin.get (c);
  cout << "Value read: " << c << endl << endl;

  cout <<
    "Something wrong - remember get does not extract delimiting character!\n";
  cout << "Reading single character again:\n";
  cin.get (c);
  cin.get ();			// just to skip newline
  cout << "Value read: " << c << endl << endl;

  cout << "Reading the whole line:\n";
  cin.get (buff, 254);
  c = cin.get ();
  cout << "Value read: " << buff << endl;
  cout << "NOT read delimeter: " << (int) c << endl << endl;

  cout << "Reading the whole line - with delimeter set to space:\n";
  cin.get (buff, 254, ' ');
  c = cin.get ();
  cout << "Value read: " << buff << endl;
  cout << "NOT read delimeter: " << (int) c << endl;
  return 0;
}