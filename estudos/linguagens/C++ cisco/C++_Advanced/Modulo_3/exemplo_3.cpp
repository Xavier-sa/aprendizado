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

struct Find
{
    char value;
    Find(const char & v):value(toupper(v)){}

    bool operator()(const char & v)
    {
        return toupper(v) == value;
    }
};

int main()
{
    int t[]={1, 2, 3, 4, 5, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4};
    vector <int> v1(t,t+18);
    for_each(v1.begin(), v1.end(), print<int>); cout<<endl;

    cout<<endl;
    cout<<"Counting values 2:\n";
    unsigned int number = count(v1.begin(), v1.end(), 2);
    cout<<"Number of items (2) found: "<< number<<endl;
    cout<<endl;

    cout<<"Counting values 10:\n";
    number = count(v1.begin(), v1.end(), 10);
    cout<<"Number of items (10) found: "<< number<<endl;
    cout<<endl;

    char ts[]={'a','b', 'c', 'a', 'A', 'b','D', 'A', 'b', 'C', 'a', 'f'};
    list <int> l1(ts,ts+12);

    cout<<"Counting values 'a' - case insensitive:\n";
    number = count_if(l1.begin(), l1.end(),  Find('a'));
    cout<<"Number of items ('a') found: "<< number<<endl;
    cout<<endl;

    cout<<"Counting values 'a' - case sensitive:\n";
    number = count(l1.begin(), l1.end(), 'a');
    cout<<"Number of items ('a') found: "<< number<<endl;
    return 0;
}