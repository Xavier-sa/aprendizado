#include <iostream>
#include <string>
#include <iomanip>
#include <vector>

using namespace std;

double multiply_value(double value)
{
    return value * 11.123;
}

int main()
{
    double value;
    cin >> value;
    vector<double> values(5);
    values[0] = value;
    for (int i = 1; i < values.size(); ++i)
        values[i] = multiply_value(values[i - 1]);
    cout << setfill('*');
    for (int i = 0; i < values.size(); ++i)
        cout << setw(10) << values[i] << "|" << setw(10) << values[values.size() - i - 1] << endl;
    return 0;
}
