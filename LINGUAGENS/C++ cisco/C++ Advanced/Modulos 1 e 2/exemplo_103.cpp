#include <queue>
#include <iostream>

using namespace std;

int
main ()
{
  int a1[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
  queue < int >q1;
  q1.push (100);
  cout << "Front: " << q1.front () << " Back: " << q1.back () << endl;
  q1.push (13);
  cout << "Front: " << q1.front () << " Back: " << q1.back () << endl;
  q1.push (44);
  cout << "Front: " << q1.front () << " Back: " << q1.back () << endl;
  //removal;
  q1.pop ();
  cout << "Front: " << q1.front () << " Back: " << q1.back () << endl;
  return 0;
}