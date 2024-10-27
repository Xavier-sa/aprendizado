#include <iostream>

using namespace std;

int
main (int argc, char **argv)
{
  char c;
  unsigned char uc;
  bool b;
  int i;
  unsigned int ui;
  long l;
  float f;
  double d;
  char text[100];
  // when readinng car - only first char is read and stored into variable
  cout << "Input - char:\n";
  cin >> c;
  cout << "Value read: " << c << endl;

  cout << "Input - unsigned char:\n";
  cin >> uc;
  cout << "Value read: " << uc << endl;

  cout << "Input - bool:\n";
  cin >> b;
  cout << "Value read: " << boolalpha << b << endl;

  cout << "Input - int:\n";
  cin >> i;
  cout << "Value read: " << i << endl;

  cout << "Input - unsigned int - reading as hex:\n";
  cin >> hex >> ui;
  cout << "Value read: " << hex << showbase << ui << endl;

  cout << dec << "Input - long:\n";
  cin >> dec >> l;
  cout << "Value read: " << l << endl;

  cout << "Input - float:\n";
  cin >> f;
  cout << "Value read: " << fixed << f << endl;

  cout << "Input - double - scientific:\n";
  cin >> d;
  cout << "Value read: " << fixed << d << endl;

  cout << "Input - text:\n";
  cin >> text;
  cout << "Value read: " << text << endl;

  return 0;
}