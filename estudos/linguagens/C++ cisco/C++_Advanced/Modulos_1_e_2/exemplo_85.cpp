#include <deque>
#include <iostream>

using namespace std;

int main()
{
    deque<int> d1(10, 0);
    cout<<"Size: "<<d1.size()<<endl;
    for(unsigned i = 0; i < d1.size(); ++i)
    {
        cout<< d1[i]<<" ";
    }
    cout<<endl;
    return 0;
}