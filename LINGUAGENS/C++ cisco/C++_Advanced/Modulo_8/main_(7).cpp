#include <iostream>

using namespace std;

int
main ()
{
  int value = 65535;
  cout << "Default ios::basefield value - dec:\n";
  cout << value << endl;

  cout << "Setting ios::basefield to oct:\n";
  cout.setf (ios::oct, ios::basefield);
  cout << value << endl;

  cout << "Setting ios::basefield to hex:\n";
  cout.setf (ios::hex, ios::basefield);
  cout << value << endl;

  cout << "Setting uppercase flag when displaying value as hex:\n";
  cout.setf (ios::uppercase);
  cout << value << endl << endl;

  cout << "Display above values using showbase flag:\n";
  cout.setf (ios::dec, ios::basefield);
  cout.setf (ios::showbase);
  cout << "Default ios::basefield value - dec:\n";
  cout << value << endl;

  cout << "Setting ios::basefield to oct:\n";
  cout.setf (ios::oct, ios::basefield);
  cout << value << endl;

  cout << "Setting ios::basefield to hex:\n";
  cout.setf (ios::hex, ios::basefield);
  cout << value << endl;

  cout << "Unsetting uppercase flag when displaying value as hex:\n";
  cout.unsetf (ios::uppercase);
  cout << value << endl;
  return 0;
}