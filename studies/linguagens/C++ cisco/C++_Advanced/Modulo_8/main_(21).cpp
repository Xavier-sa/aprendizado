#include <iostream>
#include <string>
#include <vector>

using namespace std;

int main()
{
    string value;
    string introduction = "My name is ";
    getline(cin, value);
    if (value.substr(0, introduction.size()) == introduction) {
        string end_value = value.substr(introduction.size());
        cout << "Hi " << end_value << "!" << endl;
    }
    else
    {
        cout << "Hi, please introduce yourself." << endl;
    }

    return 0;
}
