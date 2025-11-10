#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
#include <iterator>
#include <list>

using namespace std;

template <class T>
void print(const T & value) 
{
    cout<<value<<" ";
}

struct Compare
{

    bool operator()(const char &f, const char &s)
    {
        return tolower(f)==tolower(s);
    }
};

int main()
{
    int t[]={1, 2, 3, 4, 5, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4};
    vector <int> v1(t,t+18);
    for_each(v1.begin(), v1.end(), print<int>); cout<<endl;
    cout<<endl;
    cout<<"Searching for a  pair of  elements:\n";
    vector<int>::iterator found = adjacent_find(v1.begin(), v1.end());
    if (found != v1.end())
    {
        cout<<"Pair of elements "<<*found<<" has been found at position: " <<distance(v1.begin(), found)<<endl;
    }
    else
    {
        cout<<"Pair of the same elements could not  be found\n";
    }
    cout<<endl;

    char ts[]={'a','b', 'c', 'a', 'A', 'b','D', 'A', 'b', 'C', 'a', 'f'};
    list <int> l1(ts,ts+12);
    list<int>::iterator founds = adjacent_find(l1.begin(), l1.end(),  Compare());
    if (founds != l1.end())
    {
        cout<<"Pair of elements "<<*founds<<" has been found at position: " <<distance(l1.begin(), founds)<<endl;
    }
    else
    {
        cout<<"Pair of the same elements could not  be found\n";
    }
    return 0;
}