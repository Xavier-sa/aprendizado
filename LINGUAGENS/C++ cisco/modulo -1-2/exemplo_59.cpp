#include <iostream>

using namespace std;

class Node
{
public:
  Node(int val);
  int value;
  Node* next;
};

Node::Node(int val) : value(val), next(nullptr) {}

class List
{
public:
  List();
  ~List();
  void push_front(int value);
  bool pop_front(int &value);
  int  size() {return list_size;}
private:
  Node* head;
  size_t list_size;
};

List::List() : head(nullptr), list_size(0)
{
}

List::~List()
{
  while (head != nullptr) {
    Node* n = head;
    head = head->next;
    delete n;
  }
}

void List::push_front(int value)
{
  Node* new_head = new Node(value);
  new_head->next = head;
  head=new_head;
  ++list_size;
}

bool List::pop_front(int &value)
{
  if (head != nullptr)
  {
    Node* popped = head;
    head = head->next;
    value = popped->value;
    delete popped;
    --list_size;
    return true;
  }
  return false;
}

int main()
{
  List list;
  for (int i = 0; i <= 5; i++)
  {
    list.push_front(i);
    cout << "pushed " << i << ", size: " << list.size() << endl;
  }
  cout << endl;
  for (int i = 0; i < 3; i++)
  {
    int value;
    list.pop_front(value);
    cout << "popped " << i << ", size: " << list.size() << endl;
  }
  return 0;
}