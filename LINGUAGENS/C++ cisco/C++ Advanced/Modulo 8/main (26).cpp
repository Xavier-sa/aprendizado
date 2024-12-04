#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <iomanip>

using namespace std;

template <class T>
std::string getStatus(const T &stream, const char *fileName) {
    ostringstream s;
    if (stream.is_open()) {
        s << "File: " << fileName << " was successfully opened!\n";
    } else {
        s << "Failed to open file: " << fileName << endl;
    }
    return s.str();
}

std::string getFlags(const ios &stream) {
    stringstream s;
    s << boolalpha << "G:" << stream.good() << " E:" << stream.eof() << " F:" << stream.fail()
      << " B:" << stream.bad();
    return s.str();
}

int main() {
    char badName[] = {"badfilename.txt"};
    char goodName[] = {"inputfile03.txt"};

    // Create the files
    ofstream badFile(badName);
    badFile.close();

    ofstream goodFile(goodName);
    goodFile << "10 20 30 40 50"; // Example content
    goodFile.close();

    cout << "Trying to open not existing file: " << badName << "\n";
    ifstream file(badName);
    cout << "Status: " << getStatus(file, badName) << "Flags: " << getFlags(file) << endl << endl;

    cout << "Opening existing file for reading - using the same object, but with a different file: " << goodName << "\n";
    file.open(goodName, ios_base::in);
    cout << "Status: " << getStatus(file, goodName) << "Flags: " << getFlags(file) << endl << endl;

    cout << "Reading contents of the file - there is an extra end of line character in the file :\n";
    int v;
    while (file >> v) {
        cout << v << ": flags: " << getFlags(file) << endl;
    }
    cout << "Status: " << getFlags(file) << endl << endl;
    file.close();

    cout << "Reading contents of the file - different way:\n";
    file.open(goodName, ios_base::in);
    while (file.good()) {
        file >> v;
        cout << v << ": flags: " << getFlags(file) << endl;
    }
    file.close();
    cout << "Status: " << getFlags(file) << endl;

    return 0;
}