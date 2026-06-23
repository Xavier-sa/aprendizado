#include <iostream>
#include <sstream>
#include <stdexcept>
#include <string>

using namespace std;

class IPHeader
{
public:
    IPHeader(const string& IPSource, const string& IPDestination, const string& otherData)
        : IPSource(IPSource), IPDestination(IPDestination), otherData(otherData)
    {
        check(IPSource, "Source");
        check(IPDestination, "Destination");
    }

private:
    void check(string address, string type) const
    {
        stringstream splited(address);
        string s;
        int partsCount = 0;
        while (std::getline(splited, s, '.'))
        {
            if (3 < s.length() || s.length() < 1)
            {
                string e = "invalid " + type + " IP Address - wrong format.";
                throw invalid_argument(e);
            }
            if (++partsCount > 4)
            {
                string e = "invalid " + type + " IP Address - too many parts.";
                throw invalid_argument(e);
            }
            for (unsigned i = 0; i < s.length(); i++)
            {
                if (!isdigit(s[i]))
                {
                    string e = "invalid " + type + " IP Address - only digits and dots allowed.";
                    throw invalid_argument(e);
                }
            }
            int partValue = stoi(s);
            if (partValue > 255)
            {
                string e = type + " IP Address is invalid.";
                throw invalid_argument(e);
            }
        }
        if (partsCount != 4)
        {
            string e = "invalid " + type + " IP Address - incorrect parts count.";
            throw invalid_argument(e);
        }
    }

    string IPSource, IPDestination, otherData;
};

int main(void)
{
    string inputDestinationIP;
    string inputSourceIP;

    getline(cin, inputSourceIP);
    getline(cin, inputDestinationIP);

    try
    {
        IPHeader headerCorrect(inputSourceIP, inputDestinationIP, "other data");
        cout << "Valid IP Header." << endl;
    }
    catch (const invalid_argument& ex)
    {
        cout << "Invalid IP Header - " << ex.what() << endl;
    }

    getline(cin, inputSourceIP);
    getline(cin, inputDestinationIP);

    try
    {
        IPHeader headerIncorrect(inputSourceIP, inputDestinationIP, "other data");
        cout << "Valid IP Header." << endl;
    }
    catch (const invalid_argument& ex)
    {
        cout << "Invalid IP Header - " << ex.what() << endl;
    }

    return 0;
}
