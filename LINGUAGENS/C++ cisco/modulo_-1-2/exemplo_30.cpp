#include <iostream>
#include <string>

using namespace std;

class Person
{
public:
  string name;
  string nickname;
  string lastname;
  string title;
  int    age;
};

void print(Person* person)
{
  cout << person->title << ' ' << person->name <<
          " '" << person->nickname << "' "
          << person->lastname << ", " <<
          person->age << " years old" << endl;
}


int main()
{
  Person person;
  person.name     = "Benjamin";
  person.nickname = "Hawkeye";
  person.lastname = "Pierce";
  person.title    = "M.D.";
  person.age      = 97;

  cout << "Meet " << person.nickname << endl;
  print(&person);

  return 0;
}