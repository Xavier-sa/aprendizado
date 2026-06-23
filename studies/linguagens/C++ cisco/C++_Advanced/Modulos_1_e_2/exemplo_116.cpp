#include <map>
#include <string>
#include <iostream>
#include <functional>

using namespace std;

template<class T> void print(T start, T end) {
        while (start != end) {
                std::cout<< start->first<<":"<<start->second<<" "; start++;
        }
    }

template<class T, class U> void fillMap(multimap<T, T> & m, U start, U end)
{
    for( ; start!= end; ++start)
    {
        m.insert(pair<T,T>(*start, *start));
    }
}

int main()
{
    int t[]={2, 10, 8, 4, 5, 5, 3, 10, 7, 2};
    multimap<int, int > m1;
    fillMap(m1, t,t+10);
    map<int, int> m2(m1.begin(), m1.end());
    cout<<"m1: ";     print(m1.begin(), m1.end());cout<<endl;
    cout<<"m2: ";   print(m2.begin(), m2.end());cout<<endl;
    cout<<"How many '2s' there are?"<<endl;
    cout<<"Multimap m1: "<< m1.count(2)<<endl;
    cout<<"Map m2: "<< m2.count(2)<<endl;
    if (m1.count(1) >0)
    {
        cout<<"There is '1' in the map\n";
    }
    else
    {
        cout<<"There is no '1' in the map\n";
    }
    return 0;
}