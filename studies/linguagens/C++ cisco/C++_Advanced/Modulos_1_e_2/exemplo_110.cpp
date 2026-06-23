#include <iostream>
#include <queue>
#include <deque>
#include <vector>
#include <functional>

using namespace std;

int
main ()
{
  int a1[] = { 1, 100, 34, 23, 9 };

  priority_queue < int >q1 (a1, a1 + 5);
  priority_queue < int, deque < int >, greater < int >>q2 (a1, a1 + 5);
  cout << "q1 queue top: " << q1.top () << endl;
  cout << "q2 queue top: " << q2.top () << endl;
  cout << "Adding value: 101\n";
  q1.push (101);
  q2.push (101);
  cout << "q1 queue top: " << q1.top () << endl;
  cout << "q2 queue top: " << q2.top () << endl;
  cout << "Removing top of the queue: \n";
  q1.pop ();
  q2.pop ();
  cout << "q1 queue top: " << q1.top () << endl;
  cout << "q2 queue top: " << q2.top () << endl;
  //not allowed assignment
  //q1.top()=1000;
  return 0;
}