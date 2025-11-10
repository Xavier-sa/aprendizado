#include <iostream>
#include <list>
#include <set>
#include <algorithm>

using namespace std;

void print(int & value) //change argument to const int & value for set 
{
    cout<<value<<" ";
}

struct Print 
{