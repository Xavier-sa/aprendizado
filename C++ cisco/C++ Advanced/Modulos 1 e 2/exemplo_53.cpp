#include <iostream>
#include <vector>

using namespace std;

int main()
{
    float x;
    cin >> x;
    
    vector<float> v1 = {x, x + 5, x + 0.5, x + 2.3, x + 4.7};
    
    float sum = 0;
    for (float num : v1)
        sum += num;

    cout << "Sum of vector elements: " << sum << endl;
    cout << "Average value: " << sum / v1.size() << endl;

    return 0;
}
