#include <iostream>
#include <fstream>
#include <stdexcept>
#include <string>

using namespace std;

class FileException : public exception {
public:
    explicit FileException(const string& message) : message_(message) {}
    const char* what() const noexcept override {
        return message_.c_str();
    }
private:
    string message_;
};

class Matrix2x2 {
public:
    Matrix2x2() {}

    void loadFromFile(const string& filename) {
        ifstream file(filename);
        if (!file.is_open()) {
            throw FileException("File not found at: " + filename);
        }
        for (int i = 0; i < 2; ++i) {
            for (int j = 0; j < 2; ++j) {
                if (!(file >> matrix_[i][j])) {
                    throw FileException("Error reading from file: " + filename);
                }
            }
        }
        file.close();
    }

    void saveToFile(const string& filename) {
        ofstream file(filename);
        if (!file.is_open()) {
            throw FileException("No rights to write to file: " + filename);
        }
        for (int i = 0; i < 2; ++i) {
            for (int j = 0; j < 2; ++j) {
                file << matrix_[i][j] << endl;
            }
        }
        file.close();
    }

private:
    double matrix_[2][2];
};

int main() {
    Matrix2x2 matrix;
    string loadFilename = "nonexistent_file.txt";
    string saveFilename = "protected_directory/matrix.txt";

    try {
        matrix.loadFromFile(loadFilename);
    } catch (const FileException& ex) {
        cout << ex.what() << endl;
    }

    try {
        matrix.saveToFile(saveFilename);
    } catch (const FileException& ex) {
        cout << ex.what() << endl;
    }

    return 0;
}
