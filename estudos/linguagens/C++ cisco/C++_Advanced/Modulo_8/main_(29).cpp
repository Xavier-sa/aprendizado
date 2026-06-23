#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <iomanip>
#include <list>

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
    s << boolalpha << "G:" << stream.good() << " E:" << stream.eof() << " F:" << stream.fail() << " B:" << stream.bad();
    return s.str();
}

int main() {
    char outputFile[] = { "outputfile06.txt" };
    int t[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
    list<int> l(t, t + 10);

    cout << "Creating file: " << outputFile << " and opening it for writing: \n";
    ofstream file(outputFile);
    cout << "Status: " << getStatus(file, outputFile) << "Flags: " << getFlags(file) << endl;

    list<int>::iterator it = l.begin();
    for (; it != l.end(); ++it) {
        file << setw(3) << *it;
    }
    cout << "Flags: " << getFlags(file) << endl;
    file.close();

    cout << "Opening file: " << outputFile << " to write more data: \n";
    file.open(outputFile, ios_base::app);
    cout << "Status: " << getStatus(file, outputFile) << "Flags: " << getFlags(file) << endl;
    file << endl;
    list<int>::reverse_iterator it1;
    for (it1 = l.rbegin(); it1 != l.rend(); ++it1) {
        file << setw(3) << *it1;
    }
    cout << "Flags: " << getFlags(file) << endl;
    file.close();

    cout << "Flags (after closing): " << getFlags(file) << endl;

    // Reading the file to ensure the contents are written properly
    cout << "Contents of " << outputFile << ":\n";
    ifstream readFile(outputFile);
    cout << readFile.rdbuf(); // Print the contents of the file
    readFile.close();

    return 0;
}