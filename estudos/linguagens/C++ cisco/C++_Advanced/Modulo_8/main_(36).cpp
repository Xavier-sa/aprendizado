#include <iostream>
#include <fstream>
#include <string>
#include <iomanip>

using namespace std;

int main() {
    string filename = "Readme.txt";
    ifstream file(filename);
    if (!file.is_open()) {
        cout << "File error: couldn't open." << endl;
        return 1;
    }

    ofstream file_copy("copy.txt");
    if (!file_copy.is_open()) {
        cout << "File error: couldn't open." << endl;
        return 1;
    }

    string line;
    int lineNumber = 1;
    while (getline(file, line)) {
        file_copy << lineNumber << ":" << line << endl;
        lineNumber++;
    }

    file.close();
    file_copy.close();

    ifstream file_display("copy.txt");
    if (!file_display.is_open()) {
        cout << "File error: couldn't open." << endl;
        return 1;
    }

    for (int j = 0; j < 3 && getline(file_display, line); ++j) {
        cout << line << endl;
    }

    file_display.close();
    return 0;
}
