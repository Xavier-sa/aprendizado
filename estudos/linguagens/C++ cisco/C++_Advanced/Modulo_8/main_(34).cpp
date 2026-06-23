#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <iomanip>
#include <list>

using namespace std;
template < class T > std::string getStatus (const T & stream, char *fileName)
{
  ostringstream
    s;
  if (stream.is_open ())
    {
      s << "File: " << fileName << " was successfully opened!\n";
    }
  else
    {
      s << "Failed to open file: " << fileName << endl;
    }
  return s.str ();
}

std::string getFlags (const ios & stream)
{
  stringstream s;
  s << boolalpha << "G:" << stream.good () << " E:" << stream.
    eof () << " F:" << stream.fail () << " B:" << stream.bad ();
  return s.str ();
}

int
main ()
{
  char fileName[] = { "outputfile07.txt" };
  int t[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
  list < int >l (t, t + 10);

  cout << "Creating file: " << fileName << " and opening it for writing: \n";
  fstream file (fileName, ios_base::out);
  cout << "Status: " << getStatus (file,
				   fileName) << "Flags: " << getFlags (file)
    << endl;

  list < int >::iterator it = l.begin ();
  for (; it != l.end (); ++it)
    {
      file << setw (3) << *it;
    }
  file.close ();

  cout << "Opening file: " << fileName << " for reading: \n";
  file.open (fileName, ios_base::in);
  cout << "Reading contents of the file:\n";
  int v;
  while (file >> v)
    {

      cout << setw (3) << v;
    }
  cout << endl;
  cout << "Flags: " << getFlags (file) << endl;
  file.close ();
  return 0;
}