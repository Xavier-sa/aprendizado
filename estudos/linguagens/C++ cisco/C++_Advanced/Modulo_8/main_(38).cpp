#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <iomanip>

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
  char goodName[] = { "inputfile03.txt" };
  fstream file;
  cout << "Opening file for reading: " << goodName << "\n";
  file.open (goodName, ios_base::in);
  cout << "Status: " << getStatus (file,
				   goodName) << "Flags: " << getFlags (file)
    << endl;

  cout << "Reading contents of the file - line by line :\n";
  string line;
  while (getline (file, line))
    {
      stringstream s (line);
      int v;
      while (s >> v)
	{
	  cout << left << setw (3) << v;
	}
      cout << endl;
    }
  cout << "Status: " << getFlags (file) << endl;
  file.close ();

  return 0;
}