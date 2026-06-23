#include <iostream>
#include <sstream>
#include <stdexcept>
#include <string>

using namespace std;

class IPAddress {
public:
    IPAddress(const string address) : address(address) {
        check();
    }

    void printRange(string rangeMask) {
        for (char c : rangeMask) {
            if (!isdigit(c)) {
                throw invalid_argument("invalid range - only numbers.");
            }
        }
        int rangeValue = stoi(rangeMask);
        if (!isPowerOf2(rangeValue)) {
            throw invalid_argument("invalid range.");
        }

        stringstream ss(address);
        string part;
        int lastPartValue = 0;

        int partsCount = 0;
        while (getline(ss, part, '.')) {
            for (char c : part) {
                if (!isdigit(c)) {
                    throw invalid_argument("invalid IP number - only digits and dots allowed.");
                }
            }
            int partValue = stoi(part);
            partsCount++;
            if (partsCount == 4) {
                if (partValue + rangeValue > 255) {
                    throw invalid_argument("invalid IP number - number + mask > 255.");
                }
                lastPartValue = partValue + 1;
            }
        }
        for (int i = 0; i < rangeValue; i++) {
            cout << address.substr(0, address.find_last_of('.') + 1) << lastPartValue + i << endl;
        }
    }

protected:
    string address;

    void check() {
        stringstream ss(address);
        string part;
        int partsCount = 0;
        while (getline(ss, part, '.')) {
            if (part.empty() || part.size() > 3) {
                throw invalid_argument("invalid IP number - wrong format.");
            }
            for (char c : part) {
                if (!isdigit(c)) {
                    throw invalid_argument("invalid IP number - only digits and dots allowed.");
                }
            }
            int partValue = stoi(part);
            if (partValue > 255) {
                throw invalid_argument("invalid IP number.");
            }
            partsCount++;
        }
        if (partsCount != 4) {
            throw invalid_argument("invalid IP number - incorrect parts count.");
        }
    }

private:
    static bool isPowerOf2(int rangeValue) {
        return !(rangeValue == 0) && !(rangeValue & (rangeValue - 1));
    }
};

int main() {
    string inputIP;
    string inputMask;

    cout << "Enter IP address: ";
    cin >> inputIP;

    cout << "Enter range mask: ";
    cin >> inputMask;

    try {
        IPAddress ip(inputIP);
        ip.printRange(inputMask);
    } catch (const invalid_argument& ex) {
        cout << "Exception - " << ex.what() << endl;
    }

    return 0;
}
