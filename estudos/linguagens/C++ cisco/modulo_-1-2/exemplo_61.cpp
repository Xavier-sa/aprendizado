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
  void push_back(int value);
  bool pop_front(int &value);
  bool pop_back(int &value);
  int  size() {return list_size;}
private:
  Node* head;
  Node* tail;
  size_t list_size;
};

List::List() : head(nullptr), tail(nullptr), list_size(0)
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
  if (tail == nullptr)
  {
    tail = head;
  }
  ++list_size;
}

void List::push_back(int value)
{
  Node* new_tail = new Node(value);
  if (head == nullptr)
  {
    head = new_tail;
    tail = new_tail;
  }
  else
  {
    tail->next = new_tail;
    tail = new_tail;
  }
  ++list_size;
}

bool List::pop_front(int &value)
{
  if (head != nullptr)
  {
    Node* popped = head;
    head = head->next;
    if (head == nullptr)
    {
      tail = nullptr;
    }
    value = popped->value;
    delete popped;
    --list_size;
    return true;
  }
  return false;
}

bool List::pop_back(int &value)
{
  if (head != nullptr)
  {
    Node* node = head;
    if (node == tail)
    {
      value = node->value;
      head = nullptr;
      tail = nullptr;
    }
    else
    {
      while (node->next != tail)
      {
        node = node->next;
      }
      value = tail->value;
      delete tail;
      tail = node;
    }
    --list_size;
    return true;
  }
  return false;
}

int main()
{
  List list;
  //
  list.push_front(1);
  list.push_front(2);
  list.push_front(3);
  list.push_front(4);

  int value = 0;
  while (list.pop_back(value))
  {
    cout << value << endl;
  }
  return 0;
}